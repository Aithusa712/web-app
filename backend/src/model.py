from bson import ObjectId # mongodb object Id
from motor.motor_asyncio import AsyncIOMotorCollection # mongodb async driver
from pymongo import ReturnDocument # Return behaviour and update operations
from pydantic import BaseModel # Data model
from uuid import uuid4 #unique id

class ListSummary(BaseModel):
    id: str
    name: str
    item_count: int
    
    @staticmethod
    def from_doc(doc) -> "ListSummary":
        return ListSummary(
                id=str(doc["_id"]),
                name=doc["name"],
                item_count=doc["item_count"],
                )


class ListItem(BaseModel):
    id: str
    label: str
    checked: bool

    @staticmethod
    def from_doc(item) -> "ListItem":
        return ListItem(
                id=item["id"],
                label=item["name"],
                checked=item["checked"],
                )

class List(BaseModel):
    id:str
    name:str
    items: list[ListItem]

    @staticmethod
    def from_doc(doc) -> "List":
        return List(
                id=str(doc["_id"]),
                name=doc["name"],
                items=[ListItem.from_doc(item) for item in doc["items"]],
                )


class DAL:
    def __init__(self, todo_collection: AsyncIOMotorCollection):
        self.__todo__collection = todo_collection

    async def list_lists(self, session=None):
        async for doc in self.__todo__collection.find(
                {},
                projection={
                    "name": 1,
                    "item_count": {"$size": "$items"}
                    },
                sort={"name": 1},
                session=session,
                ):
            yield ListSummary.from_doc(doc)

    async def create_list(self, name: str, session=None) -> str:
        response = await self.__todo__collection.insert_one(
                {"name": name, "items": []},
                session=session,
                )
        return str(response.inserted_id)

    async def get_list(self, id: str | ObjectId, session=None) -> List:
        doc = await self.__todo__collection.find_one(
                {"_id": ObjectId(id)},
                session=session,
                )
        return List.from_doc(doc)



    async def delete_list(self, id: str | ObjectId, session=None) -> bool:
        response = await self.__todo__collection.delete_one(
                {"_id": ObjectId(id)},
                session=session,
                )
        return response.deleted_count == 1


    async def create_item(
            self,
            id: str | ObjectId,
            label: str,
            session=None,
            ) -> List |None:
        result = await self.__todo__collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {
                    "$push": {
                        "items":{
                            "id": uuid4().hex,
                            "label": label,
                            "checked": False,
                            }
                        }
                    },
                session=session,
                return_document=ReturnDocument.AFTER,
                )
        if result:
            return List.from_doc(result)


    async def set_checked_state(
            self,
            doc_id: str | ObjectId, 
            item_id: str,
            checked_state: bool,
            session=None,
            ) -> List | None:
        result = await self.__todo__collection.find_one_and_update(
                {"_id": ObjectId(doc_id), "items.id": item_id},
                {"$set": {"items.$.checked": checked_state}},
                session=session,
                return_document=ReturnDocument.AFTER,
                )
        if result:
            return List.from_doc(result)

    async def delete_item(
            self,
            doc_id: str | ObjectId,
            item_id: str,
            session=None,
            ) -> List | None:
        result = await self.__todo__collection.find_one_and_update(

                {"_id": ObjectId(doc_id)},
                {"$pull": {"items": {"id": item_id}}},
                session=session,
                 return_document=ReturnDocument.AFTER,
                )
        if result:
            return List.from_doc(result)


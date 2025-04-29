from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://yourfrontend.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mock_inventory = [
    {"product_id": "123", "name": "Product A", "stock_level": 50, "category": "Beverages"},
    {"product_id": "124", "name": "Product B", "stock_level": 20, "category": "Snacks"}
]

mock_alerts = [
    {"product_id": "123", "name": "Product A", "stock_level": 5, "threshold": 10}
]

mock_sales_trends = [
    {"date": "2023-10-01", "sales": 100},
    {"date": "2023-10-02", "sales": 150}
]

class InventoryUpdate(BaseModel):
    product_id: str
    stock_level: int

class Notification(BaseModel):
    product_id: str
    message: str

class LoginData(BaseModel):
    username: str
    password: str

@app.get("/api/inventory", response_model=List[dict])
async def get_current_inventory(product_id: Optional[str] = None, category: Optional[str] = None):
    if product_id:
        result = [item for item in mock_inventory if item["product_id"] == product_id]
    elif category:
        result = [item for item in mock_inventory if item["category"] == category]
    else:
        result = mock_inventory
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return result

@app.put("/api/inventory")
async def update_inventory(update: InventoryUpdate):
    for item in mock_inventory:
        if item["product_id"] == update.product_id:
            item["stock_level"] = update.stock_level
            return {"message": "Inventory updated successfully."}
    raise HTTPException(status_code=404, detail="Product not found")

@app.get("/api/alerts", response_model=List[dict])
async def get_restocking_alerts():
    return mock_alerts

@app.get("/api/sales/trends", response_model=List[dict])
async def get_sales_trends(start_date: date, end_date: date):
    result = [trend for trend in mock_sales_trends if start_date <= date.fromisoformat(trend["date"]) <= end_date]
    if not result:
        raise HTTPException(status_code=400, detail="Invalid date range")
    return result

@app.post("/api/notifications")
async def send_notifications(notification: Notification):
    return {"message": "Notification sent successfully."}

@app.post("/api/login")
async def login(data: LoginData):
    if data.username == "admin" and data.password == "password":
        return {"access_token": "fake-token", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Retail Inventory Management System

## Description
The Retail Inventory Management System is designed to provide real-time tracking of inventory, predict restocking needs, and minimize waste. This system enhances supply chain efficiency and improves sales forecasting for PepsiCo and its retail partners.

## Endpoints
- **GET /api/inventory**: Retrieve the current stock levels for all products.
- **PUT /api/inventory**: Update stock levels for a product.
- **GET /api/alerts**: Retrieve a list of products that need restocking.
- **GET /api/sales/trends**: Retrieve historical sales data and trends.
- **POST /api/notifications**: Trigger stock alert notifications.
- **POST /api/login**: Authenticate user and return access token.

## Example Payloads
### GET /api/inventory
**Response**:
```json
{
  "products": [
    {
      "product_id": "123",
      "name": "Product A",
      "stock_level": 50,
      "category": "Beverages"
    }
  ]
}
```

### PUT /api/inventory
**Request**:
```json
{
  "product_id": "123",
  "stock_level": 60
}
```
**Response**:
```json
{
  "message": "Inventory updated successfully."
}
```

### GET /api/alerts
**Response**:
```json
{
  "alerts": [
    {
      "product_id": "123",
      "name": "Product A",
      "stock_level": 5,
      "threshold": 10
    }
  ]
}
```

### GET /api/sales/trends
**Request**:
```json
{
  "start_date": "2023-10-01",
  "end_date": "2023-10-31"
}
```
**Response**:
```json
{
  "trends": [
    {
      "date": "2023-10-01",
      "sales": 100
    }
  ]
}
```

### POST /api/notifications
**Request**:
```json
{
  "product_id": "123",
  "message": "Stock level is below threshold."
}
```
**Response**:
```json
{
  "message": "Notification sent successfully."
}
```

### POST /api/login
**Request**:
```json
{
  "username": "admin",
  "password": "password"
}
```
**Response**:
```json
{
  "access_token": "fake-token",
  "token_type": "bearer"
}
```

## Instructions
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the application:
   ```sh
   uvicorn main:app --reload
   ```
5. The application will be available at `http://localhost:8000`.
6. Use a tool like Postman or cURL to interact with the API endpoints.

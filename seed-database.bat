@echo off
echo ========================================
echo Seeding White Label Admin Database
echo ========================================
echo.
echo This will create sample data:
echo - 3 Customers
echo - 3 Deliveries
echo - 3 Auto-generated 30-day Reminders
echo - 3 Notes
echo.

cd backend

npm run seed

echo.
echo ========================================
echo Database seeding complete!
echo ========================================
pause

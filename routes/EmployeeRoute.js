const express = require('express');
const Employee = require('../models/EmployeeModel'); // Adjust the path if needed

const router = express.Router();

// GET all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees.map(employee => ({
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        })));
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error retrieving employees.' });
    }
});


// POST create a new employee
router.post('/employees', async (req, res) => {
    try {
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: savedEmployee._id
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error creating employee.' });
    }
});

// GET a specific employee by employee_id
router.get('/employees/:employeeId', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json({
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error retrieving employee.' });
    }
});



// PUT update an employee by employee_id
router.put('/employees/:employeeId', async (req, res) => {
    try {
        const updates = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.employeeId, updates, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error updating employee.' });
    }
});



// DELETE an employee by employee_id
router.delete('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id; 
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId); 

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error deleting employee.' });
    }
});


module.exports = router;
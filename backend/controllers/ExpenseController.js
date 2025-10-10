const xlsx = require('xlsx');
const Expense = require("../models/Expense");


//ADD Expense SOURCE
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        //VALIDATION: CHECK FOR MISSING FIELDS
        if(!category || !amount || !date) return res.status(400).json({ message: "All fields are required" });

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//GET ALL Expense SOURCE
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//DELETE Expense SOURCE
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        await Expense.findOneAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//DOWNLOAD EXCEL
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //PREPARE DATA FOR EXCEL
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename=\"expense_details.xlsx\"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};
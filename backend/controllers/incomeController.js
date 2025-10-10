const xlsx = require('xlsx');
const Income = require("../models/Income");


//ADD INCOME SOURCE
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        //VALIDATION: CHECK FOR MISSING FIELDS
        if(!source || !amount || !date) return res.status(400).json({ message: "All fields are required" });

        const newIncome = new Income ({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//GET ALL INCOME SOURCE
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//DELETE INCOME SOURCE
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        await Income.findOneAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//DOWNLOAD EXCEL
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //PREPARE DATA FOR EXCEL
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename=\"income_details.xlsx\"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};
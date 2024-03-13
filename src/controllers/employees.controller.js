import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        res.send(rows);
    } catch (error) {
        res.status(500).json({ message: 'Somthing goes wrong' });
    }

}
export const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM employee where id=?', [id]);
        if (rows.length <= 0) res.status(404).json({ "message": "Employee not found" });
        else res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Somthing goes wrong' });
    }
}

export const createEmployees = async (req, res) => {
    const { name, salary } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary]);
        res.send({ id: rows.insertId, name, salary });
    } catch (error) {
        res.status(500).json({ message: 'Somthing goes wrong' });
    }
}

export const updateEmployees = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    try {
        const [result] = await pool.query('UPDATE employee SET name= IFNULL(?, name), salary= IFNULL(?, salary) WHERE id=?', [name, salary, id]);
        if (result.affectedRows <= 0) res.status(404).json({ "message": "Employee not found" });
        const [rows] = await pool.query('SELECT * FROM employee where id=?', [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Somthing goes wrong' });
    }
}

export const deleteEmployees = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id=?', [id]);
        if (result.affectedRows <= 0) res.status(404).json({ "message": "Employee not found" });
        else res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Somthing goes wrong' });
    }

}

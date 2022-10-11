'use strict';
require("dotenv").config();
const rateLimiter = require('../middleware/ratelimiter');
const Account = require("../model/account");
const express = require("express");
const { db } = require("../model/account");
const app = express();
app.use(express.json());
app.use(rateLimiter);

const createAccount = async (req, res) => {
    console.log('creating account')
    const { user_id, accountNumber, accountBalance } = req.body;
    try {
        const newAccount = await Account.create({
            user_id: user_id,
            accountNumber: accountNumber,
            accountBalance: accountBalance,
            created: Date.now()
        });
        if (newAccount) {
            console.log(newAccount, "newAccount")
            return res.status(200).json(newAccount);
        } else {
            return res.status(400).json("An error occurred");
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

const fetchAllAccountsByUserId = async (req, res) => {
    console.log('getting account')
    console.log('getting account', req.body)
    const { user_id } = req.body;
    try {
        const accounts = await db.find({
            user_id: user_id,
        }).toArray();
        console.log(accounts, "accounts")
        if (accounts) {
            console.log(accounts, "accounts")
            return res.status(200).json(accounts);
        } else {
            return res.status(400).json("An error occurred");
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = { createAccount, fetchAllAccountsByUserId };
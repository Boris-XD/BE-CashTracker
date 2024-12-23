import type { NextFunction, Request, Response } from 'express';
import Budget from '../models/Budget';

export class BudgetController {
    
    static getAll = async (req: Request, res: Response) => {
        try{
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // TODO Filter by user authenticated
            });
            res.status(200).json(budgets)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static getById = async (req: Request, res: Response) => {
        try{
            const budgets = await Budget.findByPk(req.params.id);

            if (!budgets) {
                return res.status(404).json({message: "Budget not found"})
            }

            res.status(200).json(budgets)

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static create = async (req: Request, res: Response) => {
        try{
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json("Budget created successfully")
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static updateById = async (req: Request, res: Response) => {
        try{
            const budgets = await Budget.findByPk(req.params.id);

            if (!budgets) {
                return res.status(404).json({message: "Budget not found"})
            }

            await budgets.update(req.body)
            res.status(200).json(req.body)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static deleteById = async (req: Request, res: Response) => {
        try{
            const budgets = await Budget.findByPk(req.params.id);

            if (!budgets) {
                return res.status(404).json({message: "Budget not found"})
            }

            await budgets.destroy()
            res.status(200).json('Budget deleted successfully')

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }
}

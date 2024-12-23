import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body, param } from 'express-validator'
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.get('/', BudgetController.getAll)

router.get('/:id',
    param('id')
        .isNumeric().withMessage('Id must be a number'),
    handleInputErrors,
    BudgetController.getById)

router.post('/',
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number')
        .custom(value => value > 0 ).withMessage("Amount must be greater than 0"),
    handleInputErrors,
    BudgetController.create)

router.put('/:id',
    param('id')
        .isNumeric().withMessage('Id must be a number'),
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number')
        .custom(value => value > 0 ).withMessage("Amount must be greater than 0"),
    handleInputErrors,
    BudgetController.updateById)

router.delete('/:id',
    param('id')
        .isNumeric().withMessage('Id must be a number'),
    handleInputErrors,
    BudgetController.deleteById)

export default router
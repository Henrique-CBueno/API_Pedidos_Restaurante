import { knex } from "@/DATABASE/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import {z} from "zod"

class ProductsController {
    async index(req :Request, res: Response, next: NextFunction){
        try {
            const {name} = req.query

            const products = await knex<ProductRepository>("products").select("*").whereLike("name".trim().toLowerCase(), `%${name ?? ""}%`.trim().toLowerCase()).orderBy("name")

            return res.json(products)
        } catch (error) {
            next(error)
        }
    }


    async create(req :Request, res: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(2).max(255),
                price: z.number().positive()
            })

            const { name, price } = bodySchema.parse(req.body)

            await knex<ProductRepository>("products").insert({
                name,
                price
            })

            return res.status(201).json({message: "ok", name, price})
        } catch (error) {
            next(error)
        }
    }

    async update(req :Request, res: Response, next: NextFunction){
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), {message: "id must be a number"})
                .parse(req.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(2).max(255),
                price: z.number().positive()
            })

            const { name, price } = bodySchema.parse(req.body)

            const oldProduct = await knex<ProductRepository>("products").select("*").where({id}).first()

            if(!oldProduct) throw new AppError("Product not found", 404)

            await knex<ProductRepository>("products").where({id}).update({
                name,
                price,
                updated_at: knex.fn.now()
            }).where({id})

            const newProduct = await knex<ProductRepository>("products").select("*").where({id})

            return res.status(200).json({oldProduct, newProduct})
        } catch (error) {
            next(error)
        }
    }

    async remove(req :Request, res: Response, next: NextFunction){
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), {message: "id must be a number"})
                .parse(req.params.id)

            const oldProduct = await knex<ProductRepository>("products").select("*").where({id}).first()

            if(!oldProduct) throw new AppError("Product not found", 404)

            await knex<ProductRepository>("products").where({id}).delete()

            return res.status(204).json(`${oldProduct} deleted`)
        } catch (error) {
            next(error)
        }
    }
}


export {ProductsController}
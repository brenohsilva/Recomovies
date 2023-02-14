import Fastify from "fastify";
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap(){
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/lists/information', async () => {
        const result = await prisma.lists.findMany({
            take: 20,
            orderBy: {
                createdAt: 'desc'
            }
        })
        
        
        
        return { result }
    })

    fastify.post('/lists', async (request, reply) => {
        const data = request.body
        const title = data['title']
        const autor = data['autor']
        const gender = data['gender']
        const rating = data['rating']
        const plot = data['plot']

        await prisma.lists.create({
            data: {
                title,
                autor,
                gender,
                rating,
                plot
            }
        })


       return reply.status(201).send({'code': "lista adicionada com sucesso"})
    })
    
    
    
    await fastify.listen({ port: 3333})
}

bootstrap()
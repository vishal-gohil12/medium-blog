import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_KEY: string;
    },
    Variables: {
        userId: string
    }
}>();


blogRoute.use(async (c, next) => {
    try {
        const authHeader = c.req.header('authorization');
        if (!authHeader) {
            c.status(401);
            return c.json({ error: "Unauthorized: Missing Authorization header" });
        }

        const payload = await verify(authHeader, c.env.JWT_KEY);
        if (!payload || !payload.id) {
            c.status(401);
            return c.json({ error: "Unauthorized: Invalid token" });
        }

        c.set('userId', payload.id);
        await next();
    } catch (error) {
        console.error(error);
        c.status(401);
        return c.json({ error: "Unauthorized: Token verification failed" });
    }
});

blogRoute.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log(body);

    const post = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId)
        }
    });

    return c.json({
        id: post.id
    });
});

blogRoute.put('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    await prisma.blog.update({
        where: {
            id: body.id,
            authorId: Number(userId)
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.text('updated post');
});

blogRoute.get("/bluk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ blog });

    } catch (e) {
        console.log(e);
        c.json({
            error: "ERROR"
        })
    }
});

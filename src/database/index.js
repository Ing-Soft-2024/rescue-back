import fs from "fs";
import pg from "pg-hstore";
import { Sequelize } from "sequelize";

/**
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
    dialect: 'postgres',
    // logging: false,

    database: process.env.DB_NAME ?? 'rescue',
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 5437,
});

const associateModels = async () => {
    const files = fs.readdirSync(process.env.PRODUCTION
        ? 'dist/database/models'
        : 'src/database/models',
        {
            withFileTypes: true,
        }
    );

    const basePath = process.env.DOCKER ? '/app' : '.';
    const models = {};
    for (const file of files) {
        if (!file.isFile() || !file.name.endsWith('model.js')) continue;

        // const importPath = `${basePath}/${file.parentPath}/${file.name}`;
        const importPath = `./models/${file.name}`;
        console.log(importPath);
        await import(importPath)
            .then((module) => module.default)
            .then((model) => {
                if(model?.name === undefined) return;
                models[model.name] = model;
            })
            .catch(err => {
                console.error(err);
            });
    }

    console.log(models);
    Object.values(models).forEach(model => model.associate?.(models));
}

const createDatabaseIfNotExists = async () => {
    console.log("createDatabaseIfNotExists");
    pg.call(sequelize.queryInterface, 'createSchemaIfNotExists', {
        "schemaName": process.env.DB_NAME ?? 'rescue',
    });
}

const initDatabase = async () => {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await associateModels().catch((err) => {
        console.error(err);
        process.exit(1);
    });
    console.log('Models associated!');
    await sequelize.sync().catch((err) => {
        console.error(err);
        process.exit(1);
    });
    console.log('Database synced!');
}

export { initDatabase, sequelize };

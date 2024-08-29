import fs from "fs";

class RouteError extends Error {
    constructor(message) {
        super(message);
        this.name = "RouteError";
    }
}

export default async function readRouter(app, params = {
    baseAPI: "api",
    basePath: 'src/app'
}) {
    if (!Boolean(app)) throw new RouteError("No main app provided");
    const files = fs.readdirSync(params.basePath,
        {
            withFileTypes: true,
            recursive: true
        }
    );

    for (const file of files) {
        if (!file.isFile() || file.name !== 'router.js') continue;

        const importPath = `./${file.parentPath}/${file.name}`.replace(
            process.env.PRODUCTION
                ? 'dist'
                : 'src'
            , '');
        const apiPath = `/${file.parentPath}`
            .replace(/\/\[(?<name>\w+)\]/g, '/:$<name>')
            .replace(/\/$/, '')
            .replace(
                process.env.PRODUCTION
                    ? 'dist'
                    : 'src'
                , '')
            .replace('/app/', `${params.baseAPI}/`);

        await import(importPath)
            .then((module) => {
                module = _moduleInterpreter(module);

                Boolean(module.GET) && app.get(apiPath, module.GET);
                Boolean(module.POST) && app.post(apiPath, module.POST);
                Boolean(module.PUT) && app.put(apiPath, module.PUT);
                Boolean(module.DELETE) && app.delete(apiPath, module.DELETE);

                console.log(`Route ${process.env.API_URL}${apiPath} :`, module);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

const _moduleInterpreter = (module) => {
    if (module.default) module = new module.default();
    return module;
}
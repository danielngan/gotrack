import express, {Express, Request, Response} from 'express';
import {UseCaseInteractor} from "../../application/usecases/UseCaseInteractor";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import * as http from "node:http";


export class ExpressServer {

    private app: Express = express();

    public constructor(readonly interactors: UseCaseInteractor[]) {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));

    }

    public start(port: number): http.Server {
        for (const interactor of this.interactors) {
            const path = "/" + interactor.useCase.constructor.name;
            this.app.post(path, async (req: Request, res: Response) => {
                const input = req.body;
                try {
                    const result = await interactor.execute(input);
                    res.json(result);
                } catch (error: any) {
                    res.status(500).json({ error: error.toString() });
                }
            });
            console.log("Registered POST " + path);
        }
        return this.app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
}
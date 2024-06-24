import { Request, Response } from "express";
import ModelNameService from "../services/model-name-service";

class ModelNameController {
  create = async (req: Request, res: Response) => {
    try {
      const result = await ModelNameService.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const result = await ModelNameService.findOne({ _id: req.params.id });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await ModelNameService.findAll({});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const result = await ModelNameService.update({ _id: req.params.id }, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  destroy = async (req: Request, res: Response) => {
    try {
      await ModelNameService.destroy({ _id: req.params.id });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ModelNameController();

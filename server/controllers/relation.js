import express from 'express';
import mongoose from 'mongoose';

import Relation from '../models/relation.js';

const router = express.Router();

export const getRelations = async (req, res) => {
    try {
        const relations = await Relation.find();

        res.status(200).json(relations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFilteredRelations = async (req, res) => {
  try {
      const relations = await Relation.find(req.query);

      res.status(200).json(relations);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getRelation = async (req, res) => {
    const { id } = req.params;

    try {
        const relation = await Relation.findById(id);

        res.status(200).json(relation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createRelation = async (req, res) => {
    const { title, document_Id, relation_name, relation_power, word1, word2, word1_position, word2_position, user, creator, tags } = req.body;

    const relation = new Relation({ title, document_Id, relation_name, relation_power, word1, word2, word1_position, word2_position, user, creator, tags })

    try {
        await relation.save();

        res.status(201).json(relation );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const deleteRelation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No relation with id: ${id}`);

    await Relation.findByIdAndRemove(id);

    res.json({ message: "Relation deleted successfully." });
}



export default router;
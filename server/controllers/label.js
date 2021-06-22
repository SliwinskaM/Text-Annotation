import express from 'express';
import mongoose from 'mongoose';

import Label from '../models/label.js';

const router = express.Router();

export const getLabels = async (req, res) => {
    try {
        const labels = await Label.find();

        res.status(200).json(labels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getLabel = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Label.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLabel = async (req, res) => {
    const { title, document_Id, label_name, label_whole, b, b_position, i, i_position, l, l_position, u, u_position, inner_id, creator, tags } = req.body;

    const label = new Label({ title, document_Id, label_name, label_whole, b, b_position, i, i_position, l, l_position, u, u_position, inner_id, creator, tags })

    try {
        await label.save();

        res.status(201).json(label );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const deleteLabel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No label with id: ${id}`);

    await Label.findByIdAndRemove(id);

    res.json({ message: "Label deleted successfully." });
}


export const deleteLabelByInnerId = async (req, res) => {
  const { id } = req.params;

  await Label.deleteOne({ 'inner_id': id }); 

  res.json({ message: "Label deleted successfully." , inner: id});
}


export default router;
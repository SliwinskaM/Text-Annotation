import express from 'express';
import mongoose from 'mongoose';

import AddDocument from '../models/addDocument.js';
import Label from '../models/label.js'
import Relation from '../models/relation.js'

const router = express.Router();

export const getDocuments = async (req, res) => {
    try {
        const addDocuments = await AddDocument.find();

        res.status(200).json(addDocuments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDocument = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await AddDocument.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createDocument = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newAddDocument = new AddDocument({ title, message, selectedFile, creator, tags })

    try {
        await newAddDocument.save();

        res.status(201).json(newAddDocument );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const deleteDocument = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document with id: ${id}`);

  await AddDocument.findById(id, function(err, document){
    Label.deleteMany({
      "document_Id": {
        $in: id
      }
    }, function(err) {
      if(err) return next(err);
      document.remove();
    })
    Relation.deleteMany({
      "document_Id": {
        $in: id
      }
    }, function(err) {
      if(err) return next(err);
      document.remove();
    })
  });

  res.json({ message: "Document deleted successfully." });
}




export default router;
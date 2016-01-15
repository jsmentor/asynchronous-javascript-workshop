/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

import { notFound } from '../../components/errors';
import mongoose from 'mongoose';
import User from './user.model';

export async function index (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch(err){
    next(err);
  }
};


export async function show (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return notFound(req, res);
    }
    res.status(200).json(user);
  } catch(err){
    next(err);
  }
};


export async function create (req, res, next) {
  const createdUser = await Promise.resolve({});
  res.status(200).json(createdUser);
};


export async function update (req, res, next) {
  const updatedUser = await Promise.resolve({});
  res.status(200).json(updatedUser);
};

export async function destroy (req, res, next) {
  const data = await Promise.resolve({});
  res.status(200).json({data});
};

    const express = require('express');
    const bodyParser = require('body-Parser');
    const Post = require('./models/post');
    const mongoose = require("mongoose")

    const app = express();

    mongoose.connect("mongodb+srv://max:wq0er9ZBN80GYc7x@project1-sdxqe.mongodb.net/node-angular?retryWrites=true&w=majority")
      .then(() => {
          console.log("Connected to database");
      });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
                      "Access-Control-Allow-Headers",
                      "Origin, Accecpt, Content-Type, X-Requested-With"
      );
      res.setHeader(
                      "Access-Control-Allow-Methods",
                      "GET, POST, PATCH, DELETE, OPTIONS"
      );
      next();
    })

    app.post("/api/posts", (req, res, next) => {
      const post = new Post({
        title : req.body.title,
        content : req.body.content
      });
      post.save();
      res.status(201).json({
        msg : 'Posts fetched successfully',
      });
    });

    app.use('/api/posts',(req, res, next) => {
      Post.find()
        .then(documents => {
          res.status(201).json({
          msg : 'Posts fetched successfully',
          posts: documents
      });
        });
    });

    app.delete("/api/posts/:id", (req, res, next) => {
      const paramid = req.params.id;
      console.log(paramid);
      Post.deleteOne({_id: req.params.id})
          .then( result => {
            console.log(result);
            res.status(200).json({ msg : 'Posts deleted',
                                   post : result});
        if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
     });

    module.exports = app;

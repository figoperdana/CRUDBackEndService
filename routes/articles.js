var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display books page
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM articles ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('articles',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('articles',{data:rows});
        }
    });
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('articles/add', {
        title: '',
        body: ''        
    })
})

// add a new book
router.post('/add', function(req, res, next) {    

    let title = req.body.title;
    let body = req.body.body;
    let errors = false;

    if(title.length === 0 || body.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter title and content");
        // render to add.ejs with flash message
        res.render('articles/add', {
            title: title,
            body: body
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            title: title,
            body: body
        }
        
        // insert query
        dbConn.query('INSERT INTO articles SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('articles/add', {
                    title: form_data.title,
                    body: form_data.body                    
                })
            } else {                
                req.flash('success', 'Article successfully added');
                res.redirect('/articles');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM articles WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Article not found with id = ' + id)
            res.redirect('/articles')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('articles/edit', {
                title: 'Edit Article', 
                id: rows[0].id,
                title: rows[0].title,
                body: rows[0].body
            })
        }
    })
})

// update book data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let title = req.body.title;
    let body = req.body.body;
    let errors = false;

    if(title.length === 0 || body.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter title and content");
        // render to add.ejs with flash message
        res.render('articles/edit', {
            id: req.params.id,
            title: title,
            body: body
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            title: title,
            body: body
        }
        // update query
        dbConn.query('UPDATE articles SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('articles/edit', {
                    id: req.params.id,
                    title: form_data.title,
                    body: form_data.body
                })
            } else {
                req.flash('success', 'Article successfully updated');
                res.redirect('/articles');
            }
        })
    }
})
   
// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM articles WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/articles')
        } else {
            // set flash message
            req.flash('success', 'Article successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/articles')
        }
    })
})

module.exports = router;
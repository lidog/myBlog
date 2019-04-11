/**
 * Created by lizhenhua on 2019/4/6.
 */

const {exec} = require("../db/mysql")//引入执行函数

const sqlBlogs = `select * from blogs where `;

module.exports = {
    getList(author, keyword){
        let sql = sqlBlogs+`1=1 `
        if(author){
            sql += `and author='${author}' `
        }
        if(keyword){
            sql += `and title like '%${keyword}%' `
        }
        sql+= `order by createtime desc;`
        return exec(sql)
    },
    getDetail(id){
        let sql = sqlBlogs +`id='${id}'`
        return exec(sql).then(rows=>{
            return rows[0]
        })
    },
    newBlog(blogData={}){
        const {title,content,author} = blogData;
        const createtime = Date.now();
        let sql = `
            insert into blogs (title,content,createtime,author)
            values ('${title}','${content}','${createtime}','${author}')
        `
        return exec(sql).then(({insertId})=>{
            return {
                id:insertId
            }
        })
    },
    updateBlog(blogData={}){
        const {title,content,id} = blogData;
        let sql = `update blogs set title='${title}',content='${content}' where id='${id}';`
        return exec(sql).then(({affectedRows})=>{
            if(affectedRows>0){
                return true
            }else {
                return false
            }
        })
    },
    delBlog(id="",author=''){
        let sql = `delete from blogs where id='${id}' and author='${author}';`
        return exec(sql).then(({affectedRows})=>{
            if(affectedRows>0){
                return true
            }else {
                return false
            }
        })
    }
}
const assert = require('assert')
const { json } = require('express')
const should = require('should')
const request = require('supertest')

const app = require('./index')

describe('GET /users', () => {
    it('배열을 반환한다', (done) => {
        request(app)
        .get('/users')
        .end((err, res) => {
            res.body.should.be.instanceof(Object)
            res.body.should.be.have.property('name')
            done() //테스트 종료
        })
    })
})

describe('GET /users/:id', () => {
    describe('성공', () => {
        it('유저 객체를 반환한다', (done) => {
            request(app)
            .get('/users/1')
            .end((err, res) => {
                res.body.should.have.property('id', 1)
                done() //테스트 종료
            })
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐 경우 400 응답', (done) => {
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done)
        })
        it('찾을 수 없는 id일 경우 404 응답', (done) => {
            request(app)
            .get('/users/9')
            .expect(404)
            .end(done)
        })
    })
})

describe('POST /users', () => {
    describe('성공', () => {
        it('201 응답, 생성된 유저 객체를 반환', done => {
            request(app)
            .post('/users')
            .send({
                name : 'Daniel'
            })
            .expect(201)
            .end((err, res) => {
                res.body.should.have.property('name', 'Daniel')
                done()
            })
        })
    })
    describe('실패', () => {
        it('name이 없으면 400 응답', done =>{
            request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done)
        })
        it('name이 중복이면 409 응답', done =>{
            request(app)
            .post('/users')
            .send({name : 'Alice'})
            .expect(409)
            .end(done)
        })
    })
})

describe('DELETE /users/:id', () => {
    describe('성공', () => {
        it('204 응답', done => {
            request(app)
            .delete('/users/3')
            .expect(204)
            .end(done)
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐 경우 400 응답', done =>{
            request(app)
            .delete('/users/three')
            .expect(400)
            .end(done)
        })
    })
})
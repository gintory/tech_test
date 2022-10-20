import React from 'react';
import './index.css';
import { Button, Input } from 'antd';

export default function PromiseDemo(props) {
  function base() {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => resolve('after 1s done'), 1000);
    });
  }

  function baseReject() {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
  }

  function thenToGetRes() {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => resolve('after 1s done'), 1000);
      // setTimeout(() => reject(new Error('Whoops!')), 2000);
    });
    p.then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function thenFunction() {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => resolve('after 1s done'), 1000);
    });
    p.then(console.log);
  }

  function catchErr() {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Whoops!')), 1000);
    });
    p.catch(console.log);
  }

  function baseFinally() {
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('after 1s done'), 1000);
    })
      .finally(() => {
        console.log('promise 结束');
      })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  return (
    <div className="promise">
      <h4>promise</h4>

      <div className="content">
        <div>
          <Button onClick={base} className="btn">
            基本用法-resolve
          </Button>
          <span>
            {`const p = new Promise((resolve, reject) => {
                  setTimeout(() => resolve('after 1s done'), 1000);
              });`}
          </span>
        </div>

        <div>
          <Button onClick={baseReject} className="btn">
            基本用法-reject
          </Button>
          <span>{`const p = new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Whoops!')), 1000);
              });`}</span>
        </div>

        <div>
          <Button onClick={thenToGetRes} className="btn">
            promise.then
          </Button>
          <span>
            {`  p.then(
                  (res) => {
                    console.log(res);
                  },
                  (err) => {
                    console.log(err);
                  }
            );`}
          </span>
        </div>

        <div>
          <Button onClick={thenFunction} className="btn">
            promise.then-传递函数
          </Button>
          <span>{`p.then(console.log)`}</span>
        </div>

        <div>
          <Button onClick={catchErr} className="btn">
            promise.catch
          </Button>
          <span>{`p.catch(console.log)`}</span>
        </div>

        <div>
          <Button onClick={baseFinally} className="btn">
            promise.finally
          </Button>
        </div>
      </div>
    </div>
  );
}

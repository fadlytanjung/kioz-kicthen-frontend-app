import React from 'react';
import { Link } from 'react-router-dom';

export default class Component extends React.Component {
  render() {
    return (
      <section style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        height:'100vh'
      }}>
        <h1>Page not found</h1>
        <Link to={'/'}>Back to home</Link>
      </section>
    );
  }
}

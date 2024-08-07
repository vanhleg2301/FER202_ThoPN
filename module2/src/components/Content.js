import React from "react";
import { Table } from "react-bootstrap";

class Content extends React.Component {
  render() {
    return <section>{this.props.children}</section>;
  }
}

class Left extends React.Component {
  render() {
    return (
      <div>
        <h2>Left</h2>
      </div>
    );
  }
}

class Right extends React.Component {
  render() {
    const { data, title } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Title</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((c, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.credit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
Content.Col1 = Left;
Content.Col2 = Right;

export default Content;
export { Left, Right };

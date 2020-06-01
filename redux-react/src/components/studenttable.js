import React from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Form, FormGroup, Input } from 'reactstrap';
import Tabledata from './tabledata';
import Tablehead from './table-head';
import PaginationValues from './pagination';


class StudentTable extends React.Component {
    componentDidMount() {
      const {
          redirect, redirectadd
          } = this.props;
        redirect('');
        redirectadd('');
      }

    dropdown = (event) => {
      const { 
              post: { 
                    post
                  }, pageSize
      } = this.props;
      pageSize(parseInt(event.target.value, 10), post);
    }

    render() {
      const { 
            post: {
                dropdown
              } 
            } = this.props;
     return (
        <div className="text-center w-75 mx-auto mt-5">
          <div className="row">
           <div className="col-12 mt-5">
              <Table striped>
                <Tablehead />
               <tbody>
                  <Tabledata />
               </tbody>
              </Table>
            <Pagination className="text-xs-center">
                <PaginationValues />
            </Pagination>
            <Form className="pageSize mx-auto">
              <FormGroup>
                <Input type="select" value={dropdown} onChange={this.dropdown}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </Input>
              </FormGroup>
            </Form>
           </div>
          </div>
        </div>
      );
    }
  }
  
const mapStatetoProps = (state) => ({
    post: state
});

const mapDispatchtoProps = (dispatch) => ({
  redirect: (data) => { dispatch({ type: 'REDIRECT', data }); },
  redirectadd: (data) => { dispatch({ type: 'REDIRECT_ADD', data }); },
  pageSize: (data, newData) => { dispatch({ type: 'PAGE_SIZE', data, newData }); }
});

export default connect(mapStatetoProps, mapDispatchtoProps)(StudentTable);

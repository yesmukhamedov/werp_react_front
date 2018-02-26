import React,{ PureComponent, Component } from 'react';
import { Table, Menu, Icon    } from 'semantic-ui-react';

// const arrayList= ;
class Smtable extends PureComponent {
    
    constructor(props){
        super(props);
        this.renderHeaderCells = this.renderHeaderCells.bind(this);
        this.renderHeaderRows = this.renderHeaderRows.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBodyCells = this.renderBodyCells.bind(this);
        this.renderBodyRows = this.renderBodyRows.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.renderFooterCells = this.renderFooterCells.bind(this);
        this.renderFooterRows = this.renderFooterRows.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.render = this.render.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        
        // this.state={table:[],headers:null,columns:null,footers:null,rowkey:null,pagination:false,paginationSize:0,buttons:[],activeItem:1};

        this.state={currentPage:1, paginationSize:20};
    }
    componentWillReceiveProps(nextProps){
        
            // console.log(nextProps.tableParams);
            console.log(nextProps);
        if (nextProps.tableParams!==undefined ){
            // console.log(1);
            if (nextProps.tableParams.table!==undefined && nextProps.tableParams.table.length!==undefined)
            {
                let isNewTable =false;
                if (nextProps.tableParams.table.length!==this.state.rowSize)
                {
                    isNewTable=true;
                }

                let totalPages = 1;                    
                if (nextProps.tableParams.totalPages===undefined || isNewTable){
                    // console.log(2);
                    if (nextProps.tableParams.paginationSize!==undefined)
                    {
                        // console.log(3);
                        if (nextProps.tableParams.table.length>nextProps.tableParams.paginationSize){
                            let remainder = nextProps.tableParams.table.length % nextProps.tableParams.paginationSize;
                            totalPages= (nextProps.tableParams.table.length-remainder) / nextProps.tableParams.paginationSize;
                            if (remainder>0) totalPages = totalPages+1;
                        }
                    }
                    else
                    {
                        // console.log(4);
                        if (nextProps.tableParams.table.length>this.state.paginationSize){
                            // console.log(5);
                            let remainder = nextProps.tableParams.table.length % this.state.paginationSize;
                            totalPages= (nextProps.tableParams.table.length-remainder) / this.state.paginationSize;
                                
                            if (remainder>0) totalPages = totalPages+1;
                        }
                    }
                }
                else
                {
                    totalPages=nextProps.tableParams.totalPages;
                }                    
                this.setState({totalPages:totalPages, rowSize:nextProps.tableParams.table.length})
            }
                
            // console.log(nextProps,"update333")
        }    
        if (nextProps.tableParams!==undefined && nextProps.tableParams.currentPage!==undefined){
            this.setState({currentPage:nextProps.tableParams.currentPage})
        }else if (nextProps.tableParams!==undefined && nextProps.tableParams.currentPage===undefined){
            this.setState({currentPage:1})
        }
            
    }
    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.tableParams.table===this.props.tableParams.table)
        {
            return false;
        }
        
        return true;
    }
    renderHeaderCells(row){
        // console.log("ren Header rows row")
        // console.log(row,"row");
        return row.map((object,index)=>{
                let rowspan=1;
                let colspan=1;
                let colname="";
                for (let [key,value] of Object.entries(object)){
                    // console.log(key,value)
                    
                    if (key==='rowspan') rowspan=value;
                    if (key==='colspan') colspan=value;
                    if (key==='colname') colname=value;
                    
                   
                }
                // console.log(rowspan,colspan,colname);
                return <Table.HeaderCell key={index} rowSpan={rowspan} colSpan={colspan} textAlign='center'>{colname}</Table.HeaderCell>;
            }
        
    
        )
        
    }
    
    renderHeaderRows(rows){
        return (
            rows.map((row, index)=>{
                return <Table.Row key={index}>{this.renderHeaderCells(row.columns)}</Table.Row>

            })  
        )
    }
    renderHeader(){        
        // console.log(this.props.tableParams)
        if (this.props.tableParams===null || this.props.tableParams===undefined) return;
        let headers = this.props.tableParams.headers;
        if (headers===null || headers===undefined || headers.length===0) return;

        // console.log(this.state.headers,"headers");
        return <Table.Header>{this.renderHeaderRows(headers)}</Table.Header>
    }

    renderBodyCells(row){
        // console.log(row);
        let columns = this.props.tableParams.columns;
        if (columns===null || columns===undefined || columns.length===0) return;

        return columns.map((column,index)=>{
            let colname=column.colname;
            let colvalue = '';            
            column.func? colvalue=column.func(row) : colvalue=row[colname];
            return <Table.Cell key={index}>{colvalue}</Table.Cell>;

        })
        
    }  
    renderBodyRows(rows){
        let rownum = 0;
        let rowkey = this.props.rowkey;
        let paginationSize = this.props.tableParams.paginationSize?this.props.tableParams.paginationSize:this.state.paginationSize;
        let currentPage = this.props.tableParams.currentPage?this.props.tableParams.currentPage:this.state.currentPage;
        
        let result = [];
        let start = 0;
        let rowLength = rows.length;
        if (this.props.tableParams.pagination)
        {
            if (currentPage===1){
                start=0;                
            }else
            {
                start = (currentPage*paginationSize)-paginationSize;
            }
            if (start+paginationSize>rows.length) {
                rowLength = rows.length;
            }
            else {rowLength = start+paginationSize;}
        }

        for(let i=start;i<rowLength;i++){
            let row = rows[i];
            rownum++;
            let key=null;
            if (rowkey===null) key=rownum;
            else if (rowkey!==null && row[rowkey]!==null && row[rowkey]!==undefined)  key=row[rowkey];
            else key=rownum;
            result.push(<Table.Row key={rownum}>{this.renderBodyCells(row)}</Table.Row>);
            // return <Table.Row key={key}>{this.renderBodyCells(row)}</Table.Row>;
        }
        return result;
    }
    renderBody(){
        if (this.props.tableParams===null || this.props.tableParams===undefined) return;
        let table = this.props.tableParams.table;
        if (table===null || table===undefined  || table===0) return;
        
        return <Table.Body>{this.renderBodyRows(table)}</Table.Body>
    }

    
    renderFooterCells(row){
        return row.map((object,index)=>{
                let rowspan=1;
                let colspan=1;
                let colname="";
                for (let [key,value] of Object.entries(object)){
                    if (key==='rowspan') rowspan=value;
                    if (key==='colspan') colspan=value;
                    if (key==='colname') colname=value;
                }
                return <Table.HeaderCell key={index} rowSpan={rowspan} colSpan={colspan} textAlign='right'>{colname}</Table.HeaderCell>;
            }        
    
        )
        
    }  
    renderFooterRows(rows){
        return (            
            rows.map((row, index)=>{                
                return <Table.Row key={index}>{this.renderFooterCells(row.columns)}</Table.Row>
            })            
        )
    }
    renderFooter(){        
        if (this.props.tableParams===null || this.props.tableParams===undefined) return;
        let footers = this.props.tableParams.footers;
        if ((footers===null || footers===undefined || footers.length===0) && !this.props.tableParams.pagination)  return;

        let isFooters = false;
        if (!(footers===null || footers===undefined || footers.length===0)) { isFooters=true; }

        return <Table.Footer>{isFooters && this.renderFooterRows(footers)}{this.props.tableParams.pagination && this.renderPagination()}</Table.Footer>
    }
    
    handleItemClick(pageNumber){
        if (pageNumber>0 && pageNumber<=this.state.totalPages)
        {
            let tableParams = this.props.tableParams;            
            tableParams.currentPage = pageNumber;
            this.props.changeParams(tableParams);
        }
    }
    renderPagination(){
        if (this.props.tableParams===null || this.props.tableParams===undefined) return;
        let columns = this.props.tableParams.columns;
        if (columns===null || columns===undefined || columns.length===0) return;
        let colspan = this.props.tableParams.columns.length;
        return (
        
            <Table.Row>
                <Table.HeaderCell colSpan={colspan}>
                    <Menu floated='right' pagination>
                        <Menu.Item icon onClick={()=>this.handleItemClick(1)} disabled={1===this.state.currentPage}>
                            <Icon name='angle double left' />
                        </Menu.Item>
                        <Menu.Item icon onClick={()=>this.handleItemClick(this.state.currentPage-1)} disabled={1===this.state.currentPage}>
                            <Icon name='angle left'/>
                        </Menu.Item>
                        <Menu.Item>
                            {this.state.currentPage} / {this.state.totalPages}
                        </Menu.Item>                
                        <Menu.Item icon onClick={()=>{this.handleItemClick(this.state.currentPage+1)}} disabled={this.state.currentPage===this.state.totalPages}>
                            <Icon name='angle right' />
                        </Menu.Item>
                        <Menu.Item icon onClick={()=> this.handleItemClick(this.state.totalPages)} disabled={this.state.currentPage===this.state.totalPages}>
                            <Icon name='angle double right' />
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        )
    }

    render(){
        console.log(this.state)
        return (
            <Table striped={this.props.striped} compact={this.props.compact} collapsing={this.props.collapsing} 
                celled={this.props.celled} selectable={this.props.selectable} id={this.props.id}>
                {this.renderHeader()}  
                {this.renderBody()}
                {this.renderFooter()}    
            </Table>
        );
        
        
    }

};

export default Smtable;


//header and column object example
//header and footer have the same structure

// let columns = [           
//     {
//         colname:"branch_name"
//     },
//     {
//         colname:"contract_amount",
        // func: row => (new Intl.NumberFormat('ru-RU').format(row.contract_amount))

        // <span>
        //               <strong>
        //                   Footer
        //               {/* {new Intl.NumberFormat('ru-RU').format(_.sum(_.map(table, d => d.contract_amount)))} */}
        //               </strong>
        //             </span>
//     }

// ]

// let headers = [           
//     {
//         columns:
//         [
//             {                
//                 colname:"Филиал",
//                 rowspan:2
//             }
//             ,{                
//                 colname:"Кол. дог.",
//                 rowspan:2
//             }
//             ,{                
//                 colname:"Валюта",
//                 rowspan:2
//             }
//             ,{                
//                 colname:"В рассрочку",
//                 colspan:2
//             }
//             ,{                
//                 colname:"В течении 1 месяца",
//                 colspan:2
//             }
//             ,{                
//                 colname:"В рассрочку USD",
//                 colspan:2
//             }
//             ,{                
//                 colname:"В течении 1 месяца USD",
//                 colspan:2
//             }
//             ,{                
//                 colname:"Всего USD",
//                 colspan:4
//             }
            
//         ]
//     }
    // ,{
    //     columns:
    //     [
    //         {                
    //             colname:"План",
    //         }
    //         ,{                
    //             colname:"Получен",
    //         }
    //         ,{                
    //             colname:"План",
    //         }
    //         ,{                
    //             colname:"Получен",
    //         }
    //         ,{                
    //             colname:"План",
    //         }
    //         ,{                
    //             colname:"Получен",
    //         }
    //         ,{                
    //             colname:"План",
    //         }
    //         ,{                
    //             colname:"Получен",
    //         }
    //         ,{                
    //             colname:"План",
    //         }
    //         ,{                
    //             colname:"Получен",
    //         }
    //         ,{                
    //             colname:"Процент",
    //         }
    //         ,{                
    //             colname:"Город",
    //         }
           
            
    //     ]
    // }
    
// ]
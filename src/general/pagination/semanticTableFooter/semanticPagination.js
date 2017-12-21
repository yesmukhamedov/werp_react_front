import React,{ Component } from 'react';
import { Menu, Icon   } from 'semantic-ui-react';

// const arrayList= ;
class SemanticPagination extends Component {
    
    constructor(props){
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        
        this.state={buttons:[],activeItem:1};
    }
    componentWillMount() {
              
        if (this.props.pageNumbers!=null)
        {
            let waStateButtons = [];
            for (var i = 1; i <= this.props.pageNumbers; i++) {
                let waButton = {};
                waButton={pageNumber:i,value:false};
                waStateButtons.push(waButton);
            }

            if (this.props.selectedPageNumber!=null){
                let index = this.props.selectedPageNumber-1;
                if (waStateButtons[index-2]!=null) waStateButtons[index-2].value=true; else if  (waStateButtons[index+3]!=null) waStateButtons[index+3].value=true;
                if (waStateButtons[index-1]!=null) waStateButtons[index-1].value=true; else if  (waStateButtons[index+4]!=null) waStateButtons[index+4].value=true;
                if (waStateButtons[index]!=null) waStateButtons[index].value=true;
                if (waStateButtons[index+1]!=null) waStateButtons[index+1].value=true; else if  (waStateButtons[index-4]!=null) waStateButtons[index-4].value=true;
                if (waStateButtons[index+2]!=null) waStateButtons[index+2].value=true; else if  (waStateButtons[index-3]!=null) waStateButtons[index-3].value=true;
            }
            this.setState({buttons:waStateButtons,activeItem:this.props.selectedPageNumber});
            // console.log(waStateButtons);
            // console.log(this.state);
        }
        

    }
    handleItemClick(pageNumber){
        
        if (pageNumber>this.props.pageNumbers) pageNumber = this.props.pageNumbers;
        if (pageNumber<1) pageNumber = 1;
        let index = pageNumber-1;

        let waButtons = this.state.buttons.slice();
        waButtons.map((wa)=>{return wa.value=false});
        if (waButtons[index-2]!=null) waButtons[index-2].value=true; else if  (waButtons[index+3]!=null) waButtons[index+3].value=true;
        if (waButtons[index-1]!=null) waButtons[index-1].value=true; else if  (waButtons[index+4]!=null) waButtons[index+4].value=true;
        if (waButtons[index]!=null) waButtons[index].value=true;
        if (waButtons[index+1]!=null) waButtons[index+1].value=true; else if  (waButtons[index-4]!=null) waButtons[index-4].value=true;
        if (waButtons[index+2]!=null) waButtons[index+2].value=true; else if  (waButtons[index-3]!=null) waButtons[index-3].value=true;
        this.setState({activeItem: pageNumber,buttons:waButtons});
        this.props.selectPageNumber(pageNumber);
    }
    renderItem() {

        return this.state.buttons.map((wa)=>{
            if (wa.value)
            {
                return (
                    <Menu.Item  key={wa.pageNumber} active={this.state.activeItem === wa.pageNumber} onClick={()=>this.handleItemClick(wa.pageNumber)}> {wa.pageNumber}</Menu.Item>
                );

            }
            return '';
        
        })
    }
    
  

    render(){
        
        return (
                
            <Menu floated='right' pagination>
                <Menu.Item>
                    <b>Всего: {this.props.rowNumbers} записей</b>
                </Menu.Item>
                <Menu.Item icon  onClick={()=>this.handleItemClick(this.state.activeItem-1)}>
                    <Icon name='left chevron'/>
                </Menu.Item>

                {this.renderItem()}
                
                <Menu.Item icon onClick={()=>this.handleItemClick(this.state.activeItem+1)}>
                    <Icon name='right chevron' />
                </Menu.Item>
          </Menu>

        );
        
        
    }

};


export default SemanticPagination;
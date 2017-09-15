import * as React from 'react';
import {
  css,
  getRTL
} from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react';



export interface IUOBListProps {
    items: any[];
    filterChanged: any ;
    loading: any ;
    
  }


export interface IUOBListState {
  filterText?: string;
  items?: any[];
}

export default class UOBList extends React.Component<IUOBListProps, any> {
    constructor(props: IUOBListProps) {
      super(props);
  
      
      this.state = {
        filterText: '',
        items: props.items
      };
    }
  
    public render() {
      let { items: originalItems } = this.props;
      let { items } = this.state;
      //let resultCountText = items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;
  
      return (     
        <FocusZone direction={ FocusZoneDirection.vertical }>
        <TextField label={ 'Filter by title' } onBeforeChange={ this.props.filterChanged } />
        <List
          items={this.props.items}
          onRenderCell={ (item, index) => (
            <div className='ms-ListBasicExample-itemCell' data-is-focusable={ true }>
              
              <div className='ms-ListBasicExample-itemContent'>
                <h3 className='ms-fontSize-l ms-fontColor-themePrimary'>{ item.title }</h3>
                <p className='ms-fontSize-m-plus'>{ item.description }</p>        
              </div>
              <a href={item.link} target='_blank'>
              <Icon
                className='ms-ListBasicExample-chevron'
                iconName={ getRTL() ? 'ChevronLeft':'ChevronRight' }
              /></a>
            </div>
          ) }
        />
      </FocusZone>
      );
    }
  
    
  }
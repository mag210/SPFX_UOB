import * as React from 'react';
import { IUobNewsEventsProps } from './IUobNewsEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, Button, PrimaryButton, DefaultButton, ButtonType, IButtonProps, Nav, Panel, PanelType,  SearchBox, Label, Spinner, SpinnerSize} from 'office-ui-fabric-react';
import { Dropdown} from 'office-ui-fabric-react/lib/Dropdown';
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import {
  css,
  getRTL
} from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import styles from './UobNewsEvents.module.scss';








export default class UobNewsEvents extends React.Component<IUobNewsEventsProps, any> {


  constructor(props: IUobNewsEventsProps,) {

    super(props);
    var defaultOptions =
    [
      { key: 'news-feed', text: 'All News' },
      { key: 'research', text: 'Research' },
      { key: 'grants_and_awards', text: 'Grants and Awards' },
      { key: 'press_releases', text: 'Press Releases' },
      { key: 'staff_notices', text: 'Staff Notices' },
      { key: 'events', text: 'Events' },         
    ]
    
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this.state = {
      selectedItem: null,
      items: null,
      filterText: '',
      cachedData: null,
      loading : {'display':  'none'},
      feedType : null,
      options: defaultOptions
    };
  }



  public render(): JSX.Element {
    
        console.log(styles) ;
        console.log(this.state) ;

        var showHide ;
        var appState = this.state ;
        var data ;
        try 
        {
            if (appState.feedType != null)
              {
                let type = appState.feedType ;
                if (type === "ChoiceGroup8-faculty")
                  {
                    appState.options =
                    [
                      { key: 'arts', text: 'Faculty of Arts' },
                      { key: 'research', text: 'Faculty of Biomedical Sciences' },
                      { key: 'grants_and_awards', text: 'Faculty of engineering' },
                      { key: 'press_releases', text: 'Faculty of Health Sciences' },
                      { key: 'staff_notices', text: 'Faculty of Science' },
                      { key: 'events', text: 'Faculty of Social Scieces and Law' },              
                    ]
                  }
                else
                  {
                    appState.options =
                    [
                      { key: 'news-feed', text: 'All News' },
                      { key: 'research', text: 'Research' },
                      { key: 'grants_and_awards', text: 'Grants and Awards' },
                      { key: 'press_releases', text: 'Press Releases' },
                      { key: 'staff_notices', text: 'Staff Notices' },
                      { key: 'events', text: 'Events' },             
                    ]
                  }  
              }
 
            if(appState.selectedItem != null)
            {
              let feed = appState.selectedItem.key ;
              //console.log(feed) ;
              showHide = {'display':  'block'};
              appState.loading = showHide ;
              this.getData(feed);
            }
            else
            {
              console.log("No data and no feed, loading app") ;
            }  
        
      }
      catch (error)
      {
        console.log(error) ;
      }
    
        let resultCountText = 1 ;
      
       
        
        return (

          <div>
            <div>
            <h2 className ='ms-font-su'>News and Events</h2>
            </div>

            

            <div>

        <ChoiceGroup
        label='Select a category'
        
        options={ [
          {
            key: 'all',
            iconProps: { iconName: 'Globe' },
            text: 'All University'
          },
          {
            key: 'faculty',
            iconProps: { iconName: 'Group' },
            text: 'Faculty'
          }
        ] }
        onChange={ (item) => this.setState({ feedType: item.currentTarget.id }) }
        defaultSelectedKey={'all'}
      />
      </div>
      
          <div className='dropdownExample'>
            <Dropdown 
              //placeHolder='Select an Option'
              
              label='Select a news or events feed:'
              id='Basicdrop1'
              defaultSelectedKey='D'
              ariaLabel='Basic dropdown example'
              //selectedKey={ selectedItem && selectedItem.key }
              onChanged={ (item) => this.setState({ selectedItem: item }) }     
              options= {appState.options}
            />
          
            </div>
            

            <div className='loading' style={appState.loading}> 
              <Spinner size={ SpinnerSize.large } label='Gettings events...' />
           </div>
           
            <FocusZone direction={ FocusZoneDirection.vertical }>
              <TextField label={ 'Filter by title' } onBeforeChange={ this._onFilterChanged } />
              <List
                items={ this.state.items }
                onRenderCell={ (item, index) => (
                  <div className='ms-ListBasicExample-itemCell' data-is-focusable={ true }>
                    <Image
                      className='ms-ListBasicExample-itemImage'
                      src={ item.thumbnail }
                      width={ 50 }
                      height={ 50 }
                      imageFit={ ImageFit.cover }
                    />
                    <div className='ms-ListBasicExample-itemContent'>
                      <h3 className='ms-fontSize-xl'>{ item.title }</h3>
                      <p className='ms-fontSize-l'>{ item.description }</p>
                    </div>
                    <Icon
                      className='ms-ListBasicExample-chevron'
                      iconName={ getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                    />
                  </div>
                ) }
              />
            </FocusZone>
            

            <div> 
              <PrimaryButton
                className= { styles.spacer}
                data-automation-id='test'   
                text='Save Selection'
                disabled={false}
                onClick={this._buttonOnClickHandler.bind(this)}
              />
            </div>
    </div>
    
        );
      }
    
      private _onFilterChanged(text: string) {
        let data = this.state ;
        let items = this.state.items ;
        let cachedData = this.state.cachedData ;
    
        console.log(items) ;
    
        try {

          if(text === null || text === "")
            {
              this.setState({items: cachedData })
            }
            else
            {
              this.setState({
                filterText: text,
                items: text ?
                  items.filter(item => item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0) :
                  items
              });

            } 
      }
      catch (error)
      {
        console.log(error) ;
      }
      }
    
    
      private _buttonOnClickHandler() {
        alert('You clicked the primary button');
        return false;
      }
    
      private _navOnClickHandler() {
        alert('You clicked the edit button in navigation');
        return false;
      }
    
      private _showPanel() {
        this.setState({ showPanel: true });
      }
    
      private _closePanel() {
        this.setState({ showPanel: false });
      }
    
    
    
      private getData(feed)
      {
        let items ;
        this.props.HttpClient.get("https://spfx-getevents.azurewebsites.net/",
        HttpClient.configurations.v1, {
          mode: 'cors'
        })
        .then((response: HttpClientResponse): Promise<any> => {
    
            return response.text();      
        })
        .then((data: any): void => {
          
          var events = JSON.parse(data) ;
          let showHide = {'display':  'none'};
          items = events.items ;
          this.setState({
            items: items,
            cachedData: items,
            selectedItem: null,
            loading: showHide   
          }) ;   
        })
        .catch((error: any): void => {
          console.log(error) ;
        });
      }







  
}

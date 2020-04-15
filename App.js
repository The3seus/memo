import React from 'react';
import { View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  FlatList

} from 'react-native';

import CustomActionButton from './components/CustomActionButton'

import BookCount from './components/BookCount';

import {Ionicons} from '@expo/vector-icons';

class App extends React.Component {

    constructor() {
      super()
      this.state = {
        totalCount: 0,
        readingCount: 0,
        readCount: 0,
        isAddNewBookVisible:false,
        textInputData: '',
        books: [],
        bookData: {
          author: '',
          publisher: ''
        }
      };
    }


      showAddNewBook = () => {
        this.setState({isAddNewBookVisible:true});
      

    };

    hideAddNewBook = () => {
      this.setState({isAddNewBookVisible:false})
    };

    addBook = book => {
      this.setState(
      (state, props) => ({
          books: [...state.books, book],
          totalCount: state.totalCount + 1,
          readingCount:state.readingCount + 1,
          isAddNewBookVisible: false

      }), 
      () => {
        console.log(this.state);
      }
      );
      
    };
  markAsRead = (selectedBook, index) => {
    let newList = this.state.books.filter(book => book !==
      selectedBook);

      this.setState(prevState => ({
        books: newList,
        readingCount: prevState.readingCount - 1,
        readCount: prevState.readCount + 1

      }));
    };

renderItem = (item, index) => (
  <View style={{ height:50, flexDirection: 'row'}}>
  <View style={{ flex:1, justifyContent: 'center', paddingLeft: 5
  }}>
    <Text>{item}</Text>
    </View>
    <TouchableOpacity onPress={() => this.markAsRead(item,index)} >
        <View 
        style={{
          width: 100,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center', 
          backgroundColor: '#160b1a'
          }}
          
          >
        <Text style={{ fontWeight: 'bold', color: 'white'}}>Mark as Read</Text>

        </View>
        </TouchableOpacity>
  </View>

);
  render() {
    return ( 
    <View style={{flex: 1}}>
      <SafeAreaView/>
      <View style={{ 
        height: 70, 
        borderBottomWidth: 0.5,
        borderBottomColor: '#5e3c7d',
        alignItems: 'center',
        justifyContent: 'center'
      }} 
      >
      <Text style={{fontSize: 24}}>VekTorfy AI</Text>
      </View>
      <View style={{ flex: 1}}>
      {this.state.isAddNewBookVisible &&
      <View style={{height:50, flexDirection: 'row'}}>
        <TextInput
          onChangeText={(text)=>this.setState({textInputData:text})} 
          style={{ flex:1, backgroundColor: '#c6c0cb', 
          paddingLeft: 5}}
          placeholder='Enter book name.'
          placeholderTextColor='black'
        />
        <CustomActionButton style={{backgroundColor: '#2d2337'}}
         onPress={()=>this.addBook(this.state.textInputData)}
        >
        <Ionicons name ='ios-checkmark' color='red' size={40}/>
        </CustomActionButton>

        <CustomActionButton onPress={this.hideAddNewBook}>
        <Ionicons name ='ios-close' color='red' size={40}/>
        </CustomActionButton>
        
      </View>
      }
      <FlatList
        data={this.state.books}
        renderItem={({item}, index) => this.renderItem(item, index)}
        keyExtractor={(item, index)=> index.toString()}
        ListEmptyComponent={
        <View style={{marginTop: 50, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>Not Reading anything.</Text>
        </View>
        }
      />
      <TouchableOpacity
      onPress={this.showAddNewBook}
      style={{position: 'absolute', bottom: 20, right: 20}}>
      <View 
      style={{
      width:50,
      heght:50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:25, 
      backgroundColor: '#2d2337'}}>
      <Text style={{color: 'white', fontSize: 30}}>+</Text>
      </View></TouchableOpacity>
      </View>
      <View
      style={{ 
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#5e3c7d' }}>

        <BookCount title="Book Title" count={this.state.totalCount}/>
        <BookCount title='Reading' count={this.state.readingCount}/>
        <BookCount title='Read' count={this.state.readCount}/>

        
        </View>
        <SafeAreaView/>
        </View>
      
    ); 
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});



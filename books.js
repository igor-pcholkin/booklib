function BookCtrl($scope) {
  
  $scope.readFromStorage = function() {
    var books = [];
    for (i = 0; i < localStorage.length; i++) {
      var book = JSON.parse(localStorage[i]);
      // missing id field is a legacy feature
      if (!book.id) {
        book.id = i;
      }
      books.push(book);
    }
    return books;
  };
  
  $scope.books = $scope.readFromStorage();

  $scope.rooms = [{
    'name' : 'гостиная',
    'cabinets' : ['большая телевизионная', 'крайняя правая', 
      'малая телевизионная левая', 'малая телевизионная правая', 
      'слева от холодильника','над холодильником', 'левая верхняя', 'левая нижняя' ]
  }, {
    'name' : 'детская',
    'cabinets' : ['основная', 'тумбочная']
  }];
  $scope.room = $scope.rooms[0];	
  $scope.cabinet = $scope.room.cabinets[0];
  $scope.updateDisabled = true;
 
  $scope.roomSelected = function(roomName) {
    return roomName === $scope.room.name ? 'room-selected' : 'none';
  }; 
 
  $scope.toggleRoom = function(roomName) {
    $scope.room = _.find($scope.rooms, function (room) {
      return room.name === roomName;
    });
    $scope.roomChanged();
  };

  $scope.roomChanged = function() {
    $scope.cabinet = $scope.room.cabinets[0];
  };

  $scope.cabinetSelected = function(cabinet) {
    return cabinet === $scope.cabinet ? 'cabinet-selected' : 'none';
  }; 
 
  $scope.toggleCabinet = function(cabinet) {
    $scope.cabinet = cabinet;
  };
 
  $scope.addBook = function() {
    var book = {
      id : localStorage.length,
      title : $scope.title,
      author : $scope.author,
      room : $scope.room.name,
      cabinet : $scope.cabinet,
      shelf : $scope.shelf
    };

    $scope.books.push(book);
    localStorage[book.id] = JSON.stringify(book);
    
    $scope.title = '';
    $scope.author = '';
    $scope.updateDisabled = true;
  }; 

  $scope.updateBook = function() {
    var book = _.find($scope.books, function (book) {
        return book.title === $scope.book.title &&
          book.author === $scope.book.author;
      });

    book.title = $scope.title;
    book.author = $scope.author;
    book.room = $scope.room.name;
    book.cabinet = $scope.cabinet;
    book.shelf = $scope.shelf;

    localStorage[book.id] = JSON.stringify(book);
    $scope.title = '';
    $scope.author = '';
    $scope.updateDisabled = true;
  }; 
	
	$scope.editBook = function(book) {
	  $scope.book = book;
	  
		$scope.title = book.title;
		$scope.author = book.author;
		$scope.room = _.find($scope.rooms, function (room) {
		  return room.name === book.room;
		});
		$scope.cabinet = book.cabinet;
		$scope.shelf = book.shelf;
    $scope.updateDisabled = false;
	}; 
 
  $scope.booksInCabinet = function() {
    return _.filter($scope.books, function(book) {
      return book.room === $scope.room.name && 
        book.cabinet === $scope.cabinet;
    });
  };
  
  $scope.booksInSearch = function() {
    return _.filter($scope.books, function(book) {
      var author = book.author && book.author.toLowerCase();
      var title = book.title && book.title.toLowerCase();
      var search = $scope.search && $scope.search.toLowerCase();
      return search != '' && ((author && author.indexOf(search) !== -1) || 
        (title && title.indexOf(search) !== -1));
    });
  };
  
  $scope.isUpdateDisabled = function() {
    return $scope.updateDisabled;
  };

  $scope.getBookTitle = function(book) {
    return book.title + (book.author ? ' - ' + book.author : '');
  };
}
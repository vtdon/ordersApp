var app = angular.module('ordersApp', []);

/*
app.factory('Orders', ['$http', function($http) {
        var data = {
                orders : [
                        {orderId: '001', 
                                companyName: 'SuperTrader',
                                customerAddress: 'Steindamm 80',
                                orderedItem: 'Macbook' },
                        {orderId: '002', 
                                companyName: 'Cheapskates',
                                customerAddress: 'Reeperbahn 153',
                                orderedItem: 'Macbook' },
                        {orderId: '003', 
                                companyName: 'MegaCorp',
                                customerAddress: 'Steindamm 80',
                                orderedItem: 'Guide to Hamburg' },
                        {orderId: '004', 
                                companyName: 'SuperTrader',
                                customerAddress: 'Sternstrasse 125',
                                orderedItem: 'Cooking 101' },
                        {orderId: '005', 
                                companyName: 'SuperTrader',
                                customerAddress: 'Otenser Hauptstrasse 24',
                                orderedItem: 'Inline Skates' },
                        {orderId: '006', 
                                companyName: 'MegaCorp',
                                customerAddress: 'Reeperbahn 153',
                                orderedItem: 'Playstation' },
                        {orderId: '007', 
                                companyName: 'Cheapskates',
                                customerAddress: 'Lagerstrasse 11',
                                orderedItem: 'Flux compensator' },
                        {orderId: '008', 
                                companyName: 'SuperTrader',
                                customerAddress: 'Reeperbahn 153',
                                orderedItem: 'Inline Skates' },
                ]
        };
        return data;
}]);
*/

app.factory('Orders', ['$http', function($http) {
        var ftr = {
                orders: []
        };

        ftr.getData = function() {
                return $http.get('/orders').success(function(data) {
                        //console.log('Orders: ', data);
                        angular.copy(data, ftr.orders);
                });
        };

        ftr.removeOrderId = function(orderNumber) {
                console.log('creating request to delete order: ', orderNumber);
                //$http['delete']('/orders/:id', {params : {orderId : orderNumber}})
                $http.delete('/orders/:id', {params : {orderId : orderNumber}})
                    .success(function(result) {
                            console.log(result);
                    });
        };

        return ftr;
}]);


app.controller('ordersControl', [
        '$scope',
        '$filter',
        'Orders',
        function($scope, $filter, Orders){
                Orders.getData();
                $scope.orders = Orders.orders;
                //console.log('scope.orders: ', $scope.orders);

                $scope.showOrders = $scope.orders;
                $scope.showItems = [];
                $scope.company = "";
                $scope.address = "";

                $scope.getOrdersByCompany = function() {
                        $scope.tempOrders = [];
                        angular.forEach($scope.orders, function(order) {
                                if ($scope.company == "")
                                    $scope.tempOrders.push(order);
                                if ($scope.company == order.companyName)
                                    $scope.tempOrders.push(order);
                        });
                        $scope.showOrders = $scope.tempOrders;
                };

                $scope.getOrdersByAddress = function() {
                        $scope.tempOrders = [];
                        angular.forEach($scope.orders, function(order) {
                                if ($scope.address == "")
                                    $scope.tempOrders.push(order);
                                if ($scope.address == order.customerAddress)
                                    $scope.tempOrders.push(order);
                        });
                        $scope.showOrders = $scope.tempOrders;
                };

                $scope.deleteByOrderID = function() {
                        $scope.tempOrders = [];
                        angular.forEach($scope.showOrders, function(order) {
                                if ($scope.orderId == "")
                                    $scope.tempOrders.push(order)
                                else if ($scope.orderId != order.orderId)
                                    $scope.tempOrders.push(order);
                        });
                        Orders.removeOrderId( $scope.orderId );
                        Orders.getData();

                        $scope.showOrders = $scope.tempOrders;
                };

                var orderBy = $filter('orderBy');
                $scope.showByItemCount = function() {
                         $scope.showOrders = orderBy($scope.showOrders, 'orderedItem', false);
                         $scope.showItems = [];
                         var tempItem = {};
                         var first = true;

                         // make new collection for items with the counts
                         angular.forEach($scope.showOrders, function(showOrder) {
                                if (first == true)
                                        {
                                                tempItem.orderedItem = showOrder.orderedItem;
                                                tempItem.itemCount = 1;
                                                first = false;
                                                //console.log(tempItem.orderedItem, tempItem.itemCount);
                                        }
                                else if (tempItem.orderedItem == showOrder.orderedItem) 
                                        {
                                                tempItem.itemCount = tempItem.itemCount + 1;
                                                //console.log(tempItem.orderedItem, tempItem.itemCount);
                                        }
                                else 
                                        {
                                                $scope.showItems.push({
                                                        orderedItem : tempItem.orderedItem,
                                                        itemCount : tempItem.itemCount
                                                });
                                                tempItem.orderedItem = showOrder.orderedItem;
                                                tempItem.itemCount = 1;
                                                //console.log(tempItem.orderedItem, tempItem.itemCount);
                                        }
                         });
                         $scope.showItems.push({
                                 orderedItem : tempItem.orderedItem,
                                 itemCount : tempItem.itemCount
                         });
                } 
        }]);


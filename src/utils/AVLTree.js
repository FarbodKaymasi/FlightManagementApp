class Flight {
  constructor(pilot, flightNumber, flightTime, passengers, origin, destination) {
      this.pilot = pilot;
      this.flightNumber = flightNumber;
      this.flightTime = flightTime;
      this.passengers = passengers;
      this.origin = origin;
      this.destination = destination;
  }
}

class AVLTree {
  constructor() {
      this.root = null;
  }

  insert(flight) {
      this.root = this._insertNode(this.root, flight);
  }

  _insertNode(root, flight) {
      if (!root) {
          return new AVLNode(flight);
      }

      if (flight.flightNumber < root.flight.flightNumber) {
          root.left = this._insertNode(root.left, flight);
      } else if (flight.flightNumber > root.flight.flightNumber) {
          root.right = this._insertNode(root.right, flight);
      } else {
          return root;
      }

      root.height = 1 + Math.max(this._getHeight(root.left), this._getHeight(root.right));
      let balance = this._getBalance(root);

      if (balance > 1 && flight.flightNumber < root.left.flight.flightNumber) {
          return this._rightRotate(root);
      }

      if (balance < -1 && flight.flightNumber > root.right.flight.flightNumber) {
          return this._leftRotate(root);
      }

      if (balance > 1 && flight.flightNumber > root.left.flight.flightNumber) {
          root.left = this._leftRotate(root.left);
          return this._rightRotate(root);
      }

      if (balance < -1 && flight.flightNumber < root.right.flight.flightNumber) {
          root.right = this._rightRotate(root.right);
          return this._leftRotate(root);
      }

      return root;
  }

  _getHeight(node) {
      if (!node) {
          return 0;
      }
      return node.height;
  }

  _getBalance(node) {
      if (!node) {
          return 0;
      }
      return this._getHeight(node.left) - this._getHeight(node.right);
  }

  _rightRotate(y) {
      let x = y.left;
      let T2 = x.right;

      x.right = y;
      y.left = T2;

      y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
      x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

      return x;
  }

  _leftRotate(x) {
      let y = x.right;
      let T2 = y.left;

      y.left = x;
      x.right = T2;

      x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
      y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

      return y;
  }

  displayFlights() {
      this._inOrderTraversal(this.root);
  }

  _inOrderTraversal(node) {
      if (!node) {
          return;
      }
      this._inOrderTraversal(node.left);
      console.log(`Flight Number: ${node.flight.flightNumber}, Pilot: ${node.flight.pilot}, Flight Time: ${node.flight.flightTime}, Passengers: ${node.flight.passengers}, From: ${node.flight.origin}, To: ${node.flight.destination}`);
      this._inOrderTraversal(node.right);
  }

  changeFlightTime(flightNumber, newTime) {
      let node = this._searchNode(this.root, flightNumber);
      if (node) {
          node.flight.flightTime = newTime;
      } else {
          console.log('Flight not found');
      }
  }

  _searchNode(node, flightNumber) {
      if (!node || node.flight.flightNumber === flightNumber) {
          return node;
      }

      if (flightNumber < node.flight.flightNumber) {
          return this._searchNode(node.left, flightNumber);
      }

      return this._searchNode(node.right, flightNumber);
  }

  removeFlight(flightNumber) {
      this.root = this._removeNode(this.root, flightNumber);
  }

  _removeNode(root, flightNumber) {
      if (!root) {
          return root;
      }

      if (flightNumber < root.flight.flightNumber) {
          root.left = this._removeNode(root.left, flightNumber);
      } else if (flightNumber > root.flight.flightNumber) {
          root.right = this._removeNode(root.right, flightNumber);
      } else {
          if (!root.left || !root.right) {
              root = root.left || root.right;
          } else {
              let temp = this._getMinValueNode(root.right);
              root.flight = temp.flight;
              root.right = this._removeNode(root.right, temp.flight.flightNumber);
          }
      }

      if (!root) {
          return root;
      }

      root.height = Math.max(this._getHeight(root.left), this._getHeight(root.right)) + 1;
      let balance = this._getBalance(root);

      if (balance > 1 && this._getBalance(root.left) >= 0) {
          return this._rightRotate(root);
      }

      if (balance < -1 && this._getBalance(root.right) <= 0) {
          return this._leftRotate(root);
      }

      if (balance > 1 && this._getBalance(root.left) < 0) {
          root.left = this._leftRotate(root.left);
          return this._rightRotate(root);
      }

      if (balance < -1 && this._getBalance(root.right) > 0) {
          root.right = this._rightRotate(root.right);
          return this._leftRotate(root);
      }

      return root;
  }

  _getMinValueNode(node) {
      let current = node;
      while (current.left) {
          current = current.left;
      }
      return current;
  }

  displayFlightsToDestination(destination) {
      this._inOrderTraversalDestination(this.root, destination);
  }

  _inOrderTraversalDestination(node, destination) {
      if (!node) {
          return;
      }
      this._inOrderTraversalDestination(node.left, destination);
      if (node.flight.destination === destination) {
          console.log(`Flight Number: ${node.flight.flightNumber}, Pilot: ${node.flight.pilot}, Flight Time: ${node.flight.flightTime}, Passengers: ${node.flight.passengers}, From: ${node.flight.origin}, To: ${node.flight.destination}`);
      }
      this._inOrderTraversalDestination(node.right, destination);
  }

  findFlightWithMostPassengers() {
      return this._findMaxPassengers(this.root);
  }

  _findMaxPassengers(node) {
      if (!node) {
          return null;
      }

      let max = node;
      let leftMax = this._findMaxPassengers(node.left);
      let rightMax = this._findMaxPassengers(node.right);

      if (leftMax && leftMax.flight.passengers > max.flight.passengers) {
          max = leftMax;
      }

      if (rightMax && rightMax.flight.passengers > max.flight.passengers) {
          max = rightMax;
      }

      return max;
  }
}

class AVLNode {
  constructor(flight) {
      this.flight = flight;
      this.left = null;
      this.right = null;
      this.height = 1;
  }
}


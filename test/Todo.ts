import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { TodoList } from "../typechain-types/TodoList";

describe("TodoList Test", function () {
  async function deployTodoListFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const TodoList = await hre.ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();

    return { todoList, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy successfully and set the owner correctly", async function () {
      const { todoList, owner } = await loadFixture(deployTodoListFixture);

      expect(await todoList.owner()).to.equal(owner.address);
    });
  });

  describe(" create to do", function () {
    it("Only the owner should be able to create a todo", async function () {
      const { todoList } = await loadFixture(deployTodoListFixture);

      const createTodo = await todoList.createTodo(
        "Test Todo",
        "This is a test todo"
      );
      await createTodo.wait();

      const todo = await todoList.getTodos(0);
      expect(todo[0]).to.equal("Test Todo");
      expect(todo[1]).to.equal("This is a test todo");
      expect(todo[2]).to.equal(1); 
    });


    describe("Update Todo", function(){
      it("should update todo by index", async function(){
        const { todoList } = await loadFixture(deployTodoListFixture);

        await todoList.createTodo("First Todo", "Description of the first todo");

        await todoList.updateTodo(0,"my firt Todo", "Description of my first todo");

        const todo = await todoList.getTodos(0);

        expect(todo[0]).to.equal("my firt Todo");
        expect(todo[1]).to.equal("Description of my first todo");
        expect(todo[2]).to.equal(2); 

      });
    
  describe("Get Todo by Index", function () {
    it("Should get the correct todo by index", async function () {
      const { todoList } = await loadFixture(deployTodoListFixture);

      await todoList.createTodo("Assignment", "to submit before midnight");
      


      const firstTodo = await todoList.getTodos(0);
      expect(firstTodo[0]).to.equal("Assignment");
      expect(firstTodo[1]).to.equal("to submit before midnight");
      expect(firstTodo[2]).to.equal(1); 
    })

  })
  describe("Get All Todos", function () {
    it("Should get all my todos ", async function () {
      const { todoList } = await loadFixture(deployTodoListFixture);

      await todoList.createTodo("Assignment", "to submit before midnight");
      await todoList.createTodo("i submitted Assignment", "before midnight");

      const allTodos = await todoList.getAllTodo();

    
      expect(allTodos.length).to.equal(2);
    })
  })
  
  
})
  })
})

  


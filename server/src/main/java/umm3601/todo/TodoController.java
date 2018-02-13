package umm3601.todo;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import spark.Request;
import spark.Response;

import java.io.IOException;

import static umm3601.Util.*;

public class TodoController {

  private final Gson gson;
  private TodoDatabase database;


  public TodoController(TodoDatabase database) {
    gson = new Gson();
    this.database = database;
  }


  public JsonElement getTodo(Request req, Response res) {
    res.type("application/json");
    String id = req.params("id");
    Todo todo = database.getTodo(id);
    if (todo != null) {

      return gson.toJsonTree(todo);
    } else {
      String message = "Todo with ID " + id + " wasn't found.";
      return buildFailJsonResponse("id", message);
    }
  }


  public JsonElement getTodos(Request req, Response res) {
    res.type("application/json");
    Todo[] todos = database.listTodos(req.queryMap().toMap());

    return gson.toJsonTree(todos);
  }

}

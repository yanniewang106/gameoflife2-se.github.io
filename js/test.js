// Tests use QUnit - See http://docs.jquery.com/QUnit

$(document).ready(function() {

  module("start");

  test("can be initialized", function() {
    var Start = new start;
    equal(Start.constructor, start);
    equal(Start.cells.constructor, Object);
    equal(Start.neighbours.constructor, Object);
  });

  test("cannot add cells if location already contains a cell", function() {
    var Start = new start;
    other_cell = Start.setCells(0, 0);
    raises(function() {
      Start.setCells(0, 0);
    }, Start.LocationOccupied);
  });

  test("can add cells", function() {
    var Start = new start;
    var cell = Start.setCells(0, 0);
    equal(cell.constructor, Cell);
    equal(cell.x, 0);
    equal(cell.y, 0);
  });

  test("can retrieve cells at a given location", function() {
    var Start = new start;
    var cell = Start.setCells(0, 0);
    equal(cell, Start.cell_at(0, 0));
  });

  test("resets neighbours data when adding cells", function() {
    var Start = new start;
    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(0, 1);
    ok($.inArray(cell2, Start.neighbours_around(cell1)) > -1);
    equal($.isEmptyObject(Start.neighbours), false);

    var cell3 = Start.setCells(1, 0);
    equal($.isEmptyObject(Start.neighbours), true);
  });

  test("can retrieve neighbours for a given location", function() {
    var Start = new start;

    var center_cell = Start.setCells(0, 0);

    var cell = Start.setCells(0, 1);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(1, 1, true);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(1, 0);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(1, -1, true);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(0, -1);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(-1, -1, true);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(-1, 0);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);

    var cell = Start.setCells(-1, 1, true);
    ok($.inArray(cell, Start.neighbours_around(center_cell)) > -1);
  });

  test("an retrieve alive neighbours for a given location", function() {
    var Start = new start;

    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(0, 1);
    var cell3 = Start.setCells(1, 0, true);
    equal(Start.alive_neighbours_around(cell1), 1);
  });

  test("can tick along", function() {
    var Start = new start;
    var tick = Start.tick;
    Start._tick();
    equal(Start.tick, (tick + 1));
  });

  test("can be reset", function() {
    var Start = new start;
    var cell = Start.setCells(0, 0);
    Start.tick = 100;
    equal($.isEmptyObject(Start.cells), false);
    Start._reset();
    equal(Start.tick, 0);
    equal($.isEmptyObject(Start.cells), true);
  });

  test("has boundaries", function() {
    var Start = new start;
    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(5, 5);
    equal(Start.boundaries()['x']['min'], 0);
    equal(Start.boundaries()['x']['max'], 5);
    equal(Start.boundaries()['y']['min'], 0);
    equal(Start.boundaries()['y']['max'], 5);
  });

  module("Cell");

  test("can be initialized", function() {
    var cell = new Cell(0, 0);
    equal(cell.constructor, Cell);
    equal(cell.x, 0);
    equal(cell.y, 0);
    equal(cell.dead, false);
    equal(cell.next_action, null);
  });

  test("can initialize a dead cell", function() {
    var cell = new Cell(0, 0, true);
    equal(cell.dead, true);
  });

  test("should print out according to it's state", function() {
    var cell = new Cell(0, 0);
    equal('o', cell.to_char());

    cell.dead = true;
    equal(' ', cell.to_char());
  });

  module("Rules");

  test("Rule #1: Any live cell with fewer than two live neighbours dies, as if caused by under-population", function() {
    var Start = new start;
    var cell1 = Start.setCells(0, 0);
    Start._tick();
    equal(cell1.dead, true);

    Start._reset();

    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(0, 1);
    Start._tick();
    equal(cell1.dead, true);
  });

  test("Rule #2: Any live cell with two or three live neighbours lives on to the next generation", function() {
    var Start = new start;
    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(0, 1);
    var cell3 = Start.setCells(1, 0);
    Start._tick();
    equal(cell1.dead, false);

    Start._reset();

    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(0, 1);
    var cell3 = Start.setCells(1, 0);
    var cell4 = Start.setCells(1, 1);
    Start._tick();
    equal(cell1.dead, false);
  });

  test("Rule #3: Any live cell with more than three live neighbours dies, as if by overcrowding", function() {
    var Start = new start;
    var cell1 = Start.setCells(0, 0);
    var cell2 = Start.setCells(0, 1);
    var cell3 = Start.setCells(1, 0);
    var cell4 = Start.setCells(0, -1);
    var cell5 = Start.setCells(-1, 0);
    Start._tick();
    equal(cell1.dead, true);
  });

  test("Rule #4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction", function() {
    var Start = new start;
    var cell1 = Start.setCells(0, 0, true);
    var cell2 = Start.setCells(0, 1);
    var cell3 = Start.setCells(1, 0);
    var cell4 = Start.setCells(1, 1);
    Start._tick();
    equal(cell1.dead, false);
  });

});
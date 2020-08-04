#include "Board.h"

using namespace std;

Board::Board(Level currentLevel) {
	currLevel = currentLevel;
}

Board::~Board() {

}

void Board::changeCurrentBlock(Block b) {
	currentBlock = b;
}

void Board::changeCurrentLevel(Level l) {
	currentLevel = l;
}

void Board::movePiece(std::string s) {
	vector<Cell> blockCells = currentBlock.getCells();
	//Missing checks
	if(s == "left") {
		for (int i = 0; i<blockCells.size(); i++) {
			board[numsRows + numHiddenRows - blockCells[i].getY(), blocksCells[i].get(X) - 1].setBlock(currentBlock);
			blockCells[i].setX(blocksCells[i].get(X)-1);
			blockCells[i].setY(blocksCells[i].get(Y));
		}
		currentBlock.setCells(blocksCells);
	} else if (s == "right") {
		for (int i = 0; i<blockCells.size(); i++) {
			board[numsRows + numHiddenRows - blockCells[i].getY(), blocksCells[i].get(X) + 1].setBlock(currentBlock);
			blockCells[i].setX(blocksCells[i].get(X)+1);
			blockCells[i].setY(blocksCells[i].get(Y));
		}
		currentBlock.setCells(blocksCells);

	} else  if (s == "down") {
		for (int i = 0; i<blockCells.size(); i++) {
			board[numsRows + numHiddenRows - (blockCells[i].getY()-1), blocksCells[i].get(X)].setBlock(currentBlock);
			blockCells[i].setX(blocksCells[i].get(X));
			blockCells[i].setY(blocksCells[i].get(Y)-1);
		}
		currentBlock.setCells(blocksCells);
	}
}

void Board::rotatePiece(std::string s) {

}

void Board::dropPiece() {

}

void Board::restart() {

}

bool Board::isGameOver() {

}

int Board::getScore() {

}
int Board::getLevel() {
	return currentLevel;
}

Block Board::generateBlock() {

}

bool Board::placeBlock() {

}

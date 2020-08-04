#ifndef BOARD_H
#define BOARD_H
#include <vector>
#include <string>
class Block;
class Cell;

class Board final {

	public:
		const int numRows_ = 15;
		const int numCols_ = 11;
		const int numHiddenRows = 3;

		Board(Level currentLevel);
		~Board();
		void changeCurrentBlock(Block );
		void changeCurrentLevel(Level );


		void movePiece(std::string direction);
		void rotatePiece(char );
		void dropPiece();
		void restart();

		bool isGameOver();

		int getScore();
		int getLevel();
		std::vector<std::vector<Cell>> getBoard();
	private:
		Block generateBlock();
		bool placeBlock();
		void printBoard();
		Block currentBlock;
		std::vector<std::vector<Cell>> board;
		std::vector<Block> placedBlocks;
		std::string sequenceFile;
		Level currLevel;

}

#endif BOARD_H
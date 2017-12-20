'use strict';

var DatabaseUtility = require('./DatabaseUtility.js');

var dropDatabaseChatroom =
	"DROP DATABASE IF EXISTS Chatroom;"

var createDatabaseChatroom =
	"CREATE DATABASE Chatroom;"

var useChatroom = 
	"USE Chatroom;"

var dropTableMember =
	"DROP TABLE IF EXISTS MEMBER;"

var dropTableMessage =
	"DROP TABLE IF EXISTS MESSAGE;"

var dropTableContact =
	"DROP TABLE IF EXISTS CONTACT;"

var createMember =
	"CREATE TABLE MEMBER" +
		"(Id INT NOT NULL , " +
		"Name VARCHAR(50) CHARACTER SET utf8 NOT NULL , " +
		"Email VARCHAR(255) , " +
		"Password VARCHAR(50) NOT NULL, " +
		"PRIMARY KEY(Id) " +
	");";

var createMessage = 
	"CREATE TABLE MESSAGE" + 
		"(SenderId INT NOT NULL, " + 
		"Message VARCHAR(1024) CHARACTER SET utf8 NOT NULL ," + 
		"ReceiverId INT NOT NULL," + 
		"Time DATETIME NOT NULL" + 
	");";

var createContact = 
	"CREATE TABLE CONTACT" + 
		"(MemberId INT NOT NULL , " + 
		"ContactId INT NOT NULL , " +
		"LastMessage VARCHAR(1024) CHARACTER SET utf8 NOT NULL , " + 
		"Time DATETIME NOT NULL , " + 
		"PRIMARY KEY(memberId,ContactId) " + 
	");";

DatabaseUtility.ExecuteSQLCommand(dropDatabaseChatroom);
DatabaseUtility.ExecuteSQLCommand(createDatabaseChatroom);
DatabaseUtility.ExecuteSQLCommand(useChatroom);
DatabaseUtility.ExecuteSQLCommand(dropTableMember);
DatabaseUtility.ExecuteSQLCommand(dropTableMessage);
DatabaseUtility.ExecuteSQLCommand(dropTableContact);
DatabaseUtility.ExecuteSQLCommand(createMember);
DatabaseUtility.ExecuteSQLCommand(createMessage);
DatabaseUtility.ExecuteSQLCommand(createContact);
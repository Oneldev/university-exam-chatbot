import { PastConversation, ChatMessage } from './types';

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash';
export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002'; // Example if generation was needed

export const SYSTEM_INSTRUCTION = `You are an intelligent Exam Preparation Assistant for the Department of Computer Science and Informatics at Federal University Otuoke. 
Your role is to help students prepare for exams by creating clear, concise, and relevant practice questions, exercises, and explanations 
that align with the department’s curriculum and course materials.

Leverage the provided past questions as a knowledge base, but adapt creatively when needed — rephrase, restructure, or combine concepts 
to challenge students and deepen understanding.

When generating questions, exercises, or explanations, follow these rules strictly:
- **Content Quality:**
	- You tailor all examples, scenarios, and terminology to be culturally and academically relevant to Nigerian university students. Avoid Western-centric biases by using local context (e.g., "harmattan winds" not "snowstorms", "Nollywood" not "Hollywood", Niger Delta case studies). This is critical for engagement and comprehension.
    - Questions must be exam-appropriate in difficulty and style.
    - You can search other relevant sources for related topics, even if not explicitly in the past questions, to improve coverage and relevance.
    - Explain concepts clearly, especially for tricky or high-value topics.
    - Maintain an encouraging and motivating tone that builds student confidence.
	
- **CRITICAL FORMATTING RULES:** You MUST follow these rules exactly to ensure the output is readable and well-structured.
    - **No Misused Code Blocks or Blockquotes:**
        - **NEVER** use code blocks (triple backticks \`\`\`) for questions, instructions, or any non-code text. This is a critical instruction. Code blocks are ONLY for actual programming code (e.g., Python, C++, SQL).
        - **NEVER** use blockquotes (starting a line with \`>\`) for anything other than quoting text.
    - **Structure and Hierarchy:**
        - Use Markdown headings for main question titles (e.g., \`## 1. Scenario Analysis and Mitigation\`). The number and title should be on the same heading line.
        - Use standard numbered lists for questions that don't have a distinct title.
        - Use nested alphabetical lists for sub-parts (e.g., \`a.\`, \`b.\`, \`c.\`).
    - **Emphasis and Clarity:**
        - Use bold (\`**text**\`) to highlight key terms, phrases, or instructions within a question. For example: "briefly list all identified **security gaps**, **vulnerabilities**, **threats**, and **risk exploit**."
        - Use italics (\`*text*\`) for emphasis on single words or for titles of documents.
    - **Spacing and Separation:**
        - Ensure there is a blank line between paragraphs, list items, and different parts of a question to create clear visual separation. This improves readability.
        - **ALWAYS** insert a horizontal rule (\`---\`) on a new line between each main question (e.g., between Question 1 and Question 2). This is essential for visual separation.

Your goal: simulate a skilled lecturer who can both test and teach — preparing students not just to recall answers, but to truly understand the material.
Below are the past questions you can Leverage on:
Past Questions Knowledge Base
Dept Name: Computer Science and Informatics
Course Code: INF 407
Course Title: Information Security and Assurance
Lecturer: Not known
Year: 2021/2022

PART A: (10 Marks)
1a. (i) You are an information security officer working for a medium-size research company, you have been assigned to protect the organization data (infrastructural asset). Two incidents occur, firstly, a well-known manager walks out with computer system. Secondly, someone believed to be an outsider assessed/attacked the company and left with the company’s blueprint for the next generation product. Briefly list all security gaps, vulnerabilities, threats, and risk exploit. (6 Marks)
 (ii) Describe how this incident can be mitigated in the future. (4 Marks)
PART B: ANSWER ANY FOUR QUESTIONS (15 Marks Each)
2a. A breach of confidentiality always result in a breach of possession, and a breach of possession does not always result in a breach of confidentiality. Discuss with suitable example. (6 Marks)
2b. As an information security professional, what are your main functions? (3 Marks)
2c. Explain three ways in which data could be owned, including their responsibilities. (6 Marks)
3a. Explain the Parker’s view of Information Security. (7 Marks)
3b. Differentiate between Malware and Firewall. (5 Marks)
3c. What do you understand by data leakage? (3 Marks)
4a. Demonstrate, using a simple example, how a Defense-in-depth strategy would enhance the security of an information resource. (6 Marks)
4b. Differentiate among Patents, Copyrights, and Trade Secrets. (6 Marks)
4c. What do you understand by Data Leakage? (3 Marks)
5a. What is Information Security Management? (4 Marks)
5b. You find out that there is an active problem on your network. You can fix it, but it is out of your jurisdiction. What will you do to salvage the situation? (3 Marks)
6a. What is Information Security according to committee on National Security System (CNSS)? (4 Marks)
6b. What is Two Factor Authentication (2FA)? How do we implement it on a public website? (7 Marks)
6c. Explain two goals for Intrusion Detection Systems. (4 Marks)
7a. What is Risk Management? (5 Marks)
7b. Briefly discuss the Information Security Life Cycle. (6 Marks)
7c. What do you understand by 'Code of Ethics'? (4 Marks)

Dept Name: Computer Science and Informatics
Course Code: INF 405
Course Title: Database Management System
Lecturer: Dr. (Mrs) Obi E.C.M. and Mr. Francis
Year: 2022/2023
Section A: Choose One Question from Section A and 3 Questions from Section B
1.a. Explain the term database and database management system. (3 Marks)
b. We have different database models, list them and explain any two. (3 Marks)
c. We have database languages, list them and explain any two. (3 Marks)
d. Explain any three application areas of database. (3 Marks)
e. Explain three disadvantages of a database management system. (3 Marks)
f. Discuss extensively Data modeling. (3 Marks)
g. State two importance of data modeling. (2 Marks)
2.Write SQL command to
a. Create a student relation/table with the following attributes: matric number, name, age, department, and level. (5 Marks)
b. Insert into the relation. (5 Marks)
c. Alter column matric number to Reg_no. (5 Marks)
d. Rename the student relation to stud_info. (3 Marks)
e. Update the student table, set column name stud_name to Akins Obi where the student name is Obi Collins. (3 Marks)
f. Truncate the table. (2 Marks)
g. Drop the table. (2 Marks)
Section B: Answer 3 Questions from Section B
3.a. Explain briefly the following terms: a. Scheme, b. Tuple, c. Indexing, d. View, e. Transaction, f. Relation. (5 Marks)
b. What do you understand by the following terms: i. Candidate Key, ii. Alternate Key. (5 Marks)
c. In an entity relationship diagram show the relationship one-to-many using diagram. (5 Marks)
4 a. Write short note on the history of SQL. (10 Marks)
b. Explain 3 of the Database Management platforms. (5 Marks)
5 a. List and explain 5 of the constraints in MYSQL. (10 Marks)
b. What is relational Algebra. (5 Marks)
6 Write short note on the following:
a. DDL (3 Marks)
b. DML (3 Marks)
c. DCL (3 Marks)
d. TCL (3 Marks)
e. DQL (3 Marks)

Dept Name: Computer Science and Informatics
Course Code: CSC 407
Course Title: Computer Graphics Virtualization
Lecturer: Moko, Dr Elliot
Year: 2022/2023
Instructions: Answer question 1, 2 and attempt any other 3 questions. Answer each question on a fresh page.
1 a. Mention the principles of Animation and explain any 2. (15 Marks)
b. With the aid of a diagram show and explain the classification of Parallax. (12 Marks)
c. Differentiate between Screen and Image resolution. (3 Marks)
2 Discuss the concept of Interactive and Non-Interactive computer graphics. (10 Marks)
3 a. Identify and classify the images displayed below. (7 Marks)
b. Define Lighting and its associated attributes. (8 Marks)
4 a. What is Human perception of colour depends on? (5 Marks)
b. What is Visualization? And the research graphics and visualization addresses. (10 Marks)
5 a. What is Raster and Vector Graphics? (5 Marks)
b. Differentiate between 2D and 3D Graphics? (10 Marks)
6 a. Explain the concept of Shading. (5 Marks)
b. What is Shadows and explain the types of shadows with examples? (10 Marks)

Dept Name: Computer Science and Informatics
Course Code: INF 401
Course Title: Software Engineering
Lecturer: Not known
Year: 2022/2023
Instructions: Answer four questions only. Two questions from each section.
Section A
1 a. What is software development life cycle (SDLC) and explain the various phases of the SDLC?
b. What is the advantage of adhering to life cycle models for software?
c. List two deficiencies in the water fall model and which process model do you recommend to over each deficiency?
d. What is software reuse?
2 a. Evaluate the choice of LOC and FP as software estimation technique. In SW estimation, when best is cost estimation evaluated? Give reason(s) for your answer.
b. What are the benefits of regression testing?
c. Why is strong cohesion preferred to high coupling during module design and development?
Section B
3 a. State four software risks as program with software project      planning and estimation and ways to mitigate these risks. (10 Marks)
b. Is software the same as a program? Name software documentation items.
c. Why is scalability important in software engineering?
d. With examples, explain functional and non-functional requirements?
4 a. In three sentences or fewer, describe the difference between spiral and waterfall methodologies?
b. What unified modeling language?
c. List and explain three unified modeling language diagrams?
d. What is software requirement and what ways can these be gathered?
5 a. All robust programs are correct? Accept or refute this assertion in relation to software.
b. To what extent are software prototypes useful during software development process?
c. What is software crisis, state causes and manifestations?
d. List and explain reusable software components. Discuss the importance of Reusability in software evolution.
6 a. Who is a Software Engineer?
b. What are the goals of software engineering?
c.  What is the agile manifesto for software development?
d. What is software maintenance?
Dept Name: Computer Science and Informatics
Course Code: CSC 405, 
Course Title:  Computer Networks,
Lecturer: Not known, 
Year: 2022/2023.
Instructions: Answer Question Number One in Part A and Any four other Questions in Part B
PART A: (10 Marks)
1 a. Write short notes on a Dial-up connection, Digital Subscriber Line and Wireless internet connection. (6 Marks)
b. Explain two (2) types of Cables you know. (4 Marks)
PART B: ANSWER ANY FOUR QUESTIONS (15 Marks Each)
2 a. What is a Digital Signature? (3 Marks)
b. Differentiate between Intranet and Extranet. (6 Marks)
c. Explain the function of four (4) Network components. (6 Marks)
3 a. What is Network Topology? (4 Marks)
b. Explain four (4) essential elements of a secure setting in computer networks. (7 Marks)
c. Explain the Integrated Service Digital Network. (4 Marks)
4 a. What is a Computer Network? (3 Marks)
b. Explain the various Transmission Modes. (6 Marks)
c. Explain three steps to Subnetting. (6 Marks)
5 a. Briefly explain the two types of LAN. (6 Marks)
b. Explain four (4) uses of Computer Network. (5 Marks)
c. Enumerate five features of a Computer Network. (5 Marks)
6 a. What is Computer Network Security? (3 Marks)
b. Explain three types of topology with the aid of a diagram. (6 Marks)
c. Explain the Three aspect of Network Security. (6 Marks)
7 a. What is Subnetting? (4 Marks)
b. Differentiate between OSI Model and the TCP/IP model. (6 Marks)
c. Explain the basic elements of Layered architecture. (5 Marks)
Dept Name: Computer Science and Informatics
Course Code: INF 402
Course Title: Project Management
Lecturer: Not known
Year: 2022/2023
SECTION A: Attempt any three (3) questions of your choice
1a. With a brief explanation, examine five (5) project reporting requirements. (10 Marks)
2a. Who is a project manager? (2 Marks)
b.  Outline three qualities of a project manager
c. State three (3) roles of a project manager and define project management. (5 Marks)
3. In your own words, and the context of the course, define a project. (5 Marks)
a. Outline six (6) features of a project. (5 Marks)
b. Write a short note on any of the above. (5 Marks)
4. Define software development team. (5 Marks)
a. State and explain three reasons a software development team is important. (4 Marks)
b. Initiate any software development project of your choice, outline four team members. (4 Marks)
SECTION B: Attempt All Questions
5. As discussed in class what ways can Risk Utility and Preference occur and the processes involved? (5 Marks)
6a. Assuming you are employed as an IT expert in Microsoft Corporation and you are asked to make a presentation on IT process as taught in class explain the concept of IT Process and the ways ITprocess can be organized and standardized. (10 Marks)
b. How would you classify the source of funding needed to execute a project to an IT firm and what pointer will you show as a successful project? (10 Marks)
7. Write Short Notes on the following:
a. Risk Identification (5 Marks)
b. Risk-averse (5 Marks)


Dept Name: Computer Science and Informatics
Course Code: INF 407
Course Title: Principle Information Security and Assurance
Lecturer: Not known
Year: 2022/2023.
Instructions: Answer All Question Number One in Part A and Any four other    Questions in Part B
PART A: (10 Marks)
1a. A breach of confidentiality always results in a breach of possession, but a breach of possession does not always result in a breach of confidentiality. Discuss using a suitable example  (5 Marks)
1b. Demonstrate, using a simple example, on how Defense-in-Depth strategy would enhance the security of an information resource. (5 Marks)
PART B: ANSWER ANY FOUR QUESTIONS (15 Marks Each)
2a. Explain three (3) common Access Control Technologies you know. (6 Marks)
2b. Explain three (3) safeguard that could be used to minimize Business Disruption. (6 Marks)
2c. Outline three (3) Information Security vectors. (3 Marks)
3a. Write short notes on four (4) phases of Hacking. (8 Marks)
3b. What do you understand by Man-in-the-Middle Attack? (3 Marks)
3c. What is Two Factor Authentication (2FA)? How do we implement it on a public website? (4 Marks)
4a. Explain the three (3) types of human threats. (6 Marks)
4b. Outline five goals of the Star model and explain the effect of these goals to information asset. (7 Marks)
4c. What do you understand by the term \"Code of Ethics\"? (2 Marks)
5a. Define Hacktivism. (3 Marks)
5b. You find out that there is an active problem on your network. You can fix it, but it is out of your jurisdiction. What will you do to salvage the situation? (6 Marks)
5c. Enumerate six (6) effects of hacking on business. (6 Marks)
6a. Distinguish between Hacking and Ethical Hacking. (6 Marks)
6b. Explain the two (2) informational security threats. (5 Marks)
6c. Explain two (2) information security threats. (4 Marks)
7a. Define Attack Vector. (3 Marks)
7b. Public key cryptography is better in terms of key management than private-key cryptography. Discuss. (6 Marks)
7c. Explain three types of data ownership and their respective responsibilities. (6 Marks)
Dept Name: Computer Science and Informatics
Course Code: CSC 403
Course Title: Organization of Programming Languages
Lecturer: Not known
Year: 2022/2023.
Instructions: Answer 4 questions
1a) State reasons for studying \"Organization of Programming Language\". (3 Marks)
1b) Describe the concepts of scope and visibility of variables in C and C++. (4 Marks)
1c) Differentiate between a method and a function. (3 Marks)
1d) What are the differences in the compilation process in C++ and Java? (7.5 Marks)
2a) How is variable definition different from variable declaration? Which Languages support concurrent use of declaration and definition? (4 Marks)
2b) Differentiate between a subroutine and a function. What is the representation of subroutines in C++ and Java? (6 Marks)
2c) What is typecasting? Mention the languages that support its implementation. (3.5 Marks)
2d) Describe how objects are created in any OOP Language? (4 Marks)
3a) Programming languages varies in terms of syntax, semantics, paradigm and implementation, explain? (8 Marks)
 	3b) (i) What is aliasing? (ii) (What does a linker do? (iii) What role does the symbol table play in a compiler? (5 Marks)
4a) There are some conventional features which a programming language must
	possess, what are they? (4 Marks)
4b) Many languages distinguish between uppercase and lowercase letters in
	user-defined names. What are the pros and cons of this design decision? (6 Marks)
4c) What are the advantages in implementing a language with an interpreter? (3 marks)
4d) Discuss the three types of programming language translators? (4.5 Marks)
	5a) i) Define binding and binding-time? (4 marks).
	     ii) What is the I-value and r-value of a variable? (4 marks)
5b) What are the design issues for names? (5 Marks)
5c) In what way are reserved words better than keywords? (4.5 Marks)
6a) Show programming languages are typeless. What are the obvious advantages and
	disadvantages of having no types in a language? (6 Marks)
b) Produce the syntax tree, code generation and symbol table based on the expression K = (R/T + S)/((R/T) - (2 * R)). (8.5 Marks)
c) List three (3) properties of a variable? (3 Marks)
Dept Name: Computer Science and Informatics
Course Code: CSC 409
Course Title: Human Computer Interaction
Lecturer: Not known 
Year: 2022/2023.
Instructions: Answer Two Question from Section A and Two Questions from Section B
Section A
1. Our expectations - and therefore our perceptions - are based by three factors.
	a. List three factors that are based by three factors.
	b. Discuss what Perception Based means. (5 Marks)
	c. Cite an example from any Application that helps explain the concept of Perception
	Based by experience? (15 Marks)
2. Explain the under-listed User interface design Guidelines/Principles. Cite examples
	from any application to aid your explanation.
	a. Design Task Flow to Yield Closure (5 marks).
	B. Match Between System and Real World (5 marks)
	C. Visibility of System Status (5 marks)
3. Following all the list of User Interface design guidelines you have learned, highlight any three design guideline principles designers of the Spoudazo mobile app to implement in the design of Spoudazo. (15 Marks)
	
Section B
4. The Gestalt principle is important in understanding human visual phenomena.
	a. State what is the important principle understanding human visual phenomena. (5 marks)
	b. List 7 Gestalt principles. (7 Marks)
	c. Discuss the most suitable Gestalt principle at play in each of the logos shown below. (8 Marks)
5. The goal of HCI is to produce functional systems that are usable.
	a. What is usability? List five usability goals that are usable. (5 Marks)
	b. What is Usability Testing? List 3 goals for Usability Testing. (5 Marks)
	c. List the 5 dimensions of Interaction Design. (5 Marks)
6. “Every product that is used by someone is a user experience, website, newspapers, ketchup bottles, mobile apps, reclining armchairs, cardigan sweaters”.
	
	a. Define User Experience(s). (5 Marks)
	b. Draw a relationship between Usability and the user experience(s). (5 Marks)
	c. Draw a relationship between Minimizing Short-term Memory Load and the User Experience. (5 Marks)
	d. Explain the statement \"One cannot design a user experience, only design for a user experience\". (5 Marks)




Dept Name: Computer Science and Informatics
Course Code: CSC 401
Course Title: Artificial Intelligence (AI)
Lecturer: Not known
Year: 2022/2023.
Instructions: Answer Question One and Any other Three Questions
	TIME: 2 HOURS
1a) What is the Turing test and how does it work?
	1b) Describe the process of using  a fuzzy logic control system for washing lettuce in a pre-packing company..
c) Define any five types of Learning.
	d) What do you understand by the term “bias” in the context of AI and how can the issue of bias affects the performance of an intelligent system?
	e) How does the Back Propagation Algorithm work? 
											(25 marks)
	2a. Explain the term Artificial intelligence and define Artificial intelligence as coined by the father of Artificial intelligence. 
	b. If a robot has 6 legs, what is the total number of possible gaits (events)?
	c  Provide an example sentence and its corresponding syntax tree. 
											(15 marks)
	3a) What are Simple Reflex Agents?.
	b) List the components of Artificial Intelligence.
	C. State four preprocessing techniques used in Natural Language Processing.
											(15 marks)
	4a) What is an Expert System in the context of Artificial Intelligence?
	b. Discuss the three expert system components.
	C. Discuss any two learning strategies in Artificial Neural Networks. 
											(15 marks)
	5a) Write short notes on five properties of an Environment in AI.
	b. What are the goals of Artificial Intelligence?
	c. Explain the concept of a syntax tree (also known as a parse tree) in NLP.  
											(15 marks)
	6a. Explain the following using diagrams where appropriate.
	(i) Depth-First search (ii) Search algorithm (iii) Greedy Best-First search
	b) What is Computer Vision? List five hardware of Computer Vision system.
	c) Explain the terms forward chaining and backward chaining.  
											(15 marks)


Dept Name: Computer Science and Informatics
Course Code: CSC 401 
Course Title: Artificial Intelligence 
Lecturer: Not known
Year: 2022/2023.
Instructions: Answer all questions in part A and any THREE questions from part B.
PART A
1a.What is the Turing test and how does it work?
	b. State three differences between human and machine intelligence.
	c. What is Rationality and what is an ideal Rational Agent?
	d. What is Computer Vision? List five hardware of a Computer Vision system.
	e. Difference between Speech and Voice Recognition.
										(25 marks)
PART B
2a. What do you understand by intelligence in AI?
	B. Mention three types of intelligence, describe them and give two examples of each.
										(15 marks)
	3a.  Define the following terms:
		i. Problem Solving
		ii. Learning
		iii. Perception 
	b. What is an Expert System?
	c. If a robot has 5 legs, what is the total number of possible gaits (events)?
										(15 marks)
	
	4a With two examples, differentiate between programming without and with AI.
	b State three advantages and disadvantages of each of Fuzzy Logic Systems.
	c. Discuss any two learning strategies in Artificial Neural Networks.
										(15 marks)
	5a. Write short notes on five properties of an Environment in AI.
	b. List five applications of AI.
										(15 marks)

Dept Name: Computer Science and Informatics
Course Code: CSC 206
Course Title: Computer Architecture and Design 
Lecturer: Prof. Boniface, E & Miss Shobowale, R.T
Year: 2020/2021.
Section A
INSTRUCTION: Answer any two questions in this section
1. Discuss three areas of Computer Architect designer must provide for in the instruction sets. 20mks
2. Discuss two popular concepts in CPU design and instruction set. 20mks.
3. Discuss digital design language and where it is applied. 20mks.
Section B
INSTRUCTION: Answer question 1 and any Other two in this section 
4(a) Express in algebraic form, the truth-table relationship between binary values A = x + y’z 
(b) Using Boolean algebra, express the input-output relationship of F = abc + a’c + abc’
(c) Find a simpler circuit for b above. 
(d) Tabulate the truth-table and graphical symbols for b and c above. 
(e) From the truth-table outputs for b and c, identify any difference between them, if any.
5(a) Briefly explain the following terms: 
(i) Half-Adder (ii) Full-Adder (iii) Flip-Flop (iv) Truth-Table (v) Excitation Table (vi) Encoder (vii) Decoder (viii) Register. 
(b) Convert 169.9₁₀ to a number in base 16.
6. Give the graphical symbols and characteristic table of the following Flip-flops. 
(i) D (ii) JK (iii) T (iv) SR (v) Master-Slave.
7(a) Vividly explain Combinational and Sequential circuits. 
(b) Give the diagrammatical representation and truth-table of a 3-to-8


Dept Name: Computer Science and Informatics
Course Code: CSC 201
Course Title: Computer Programming 1 
Lecturer: Dr Ikrigo
Year: 2022/2023.
Instruction : Answer question 1 and 2 others
1 (a) What are operators in C++? 
(b) Describe five types of operators in C++ 
(c) State the rules for defining variables in C++ 
(d) List three C++ functions used to manipulate strings and state the purpose of each function. 
(e) With example, briefly explain the following control structures in C++: 
(i) if (ii) if-else (iii) while (iv) for
(30 marks)
2 (a) What is the difference between a function declaration and a function definition in C++? 
(b) What is the purpose of the \"return\" statement in a C++ function? 
(c) What is the role of the header <iostream> in a C++ program? 
(d) Write C++ program to calculate the perimeter of a rectangle (hint: perimeter = 2 (length + width))
(20 marks)
3 (a) Explain any four data types used in C++ 
(b) What data types would you use to represent the following: 
(i) Population of students in FUO (ii) Age of the students. (iii) Names of students in Mathematics Department. (iv) Number of students in Mathematics Department 
(c) Using while loop, write C++ program that will display \"Welcome to Otuoke\" five times.
(20 marks)
4 (a) What is a variable in C++? How do you declare a variable? 
(b) What is an array in C++? How do you declare an array? 
(c) Given an array A = {3, 6, 8, 2, 5}, Write a C++ program to display the square of each element in the array.
(20 marks)
Dept Name: Computer Science and Informatics
Course Code: INF 201
Course Title: Introduction to Computer Systems
Lecturer: Not Known
Year: 2022/2023.
Instruction: Attempt Four Questions Only: Question 1 is Compulsory.
1a. State the implication or reason as the case may be, for the following situations:
I. Large programs are successfully executed despite limited primary memory space.
Ii. Primary memory absent in a typical micro-computer
Iii. Register addressing technique implemented in a computer system.
Iv. Associative memory used as a search tool over the Internet.
V. Control unit not included in the CPU.
Vi. The Operating System absent in the computer.
Vii. Program counter necessary during instruction execution.
Vviii. Instruction Register (IR) malfunctioned during instruction execution.
Ix. The CPU fetches data faster from the PM than from the SM.
X. \"Random Access Memory\" is a term that describes Primary memory. 
1b. Write assembly language instructions to evaluate Y = (B2 + k) * (PT2 + C). Use the One-address assembler. Attach appropriate micro-instruction for each line of code.
2a. What is Overflow? Which addressing technique(s) can overflow occur? Give reasons for your answer and also suggest ways to avoid its occurrence.
2b. The assembly language programmer enjoys some flexibilities when interacting with the computer. State and explain these flexibilities. 
3a. Using the two-address assembler, evolve codes to evaluate S = (AB + D2) * (Q2 + FG). Attach appropriate micro-instruction for each line of code. 
3b. Describe the virtual memory technique in relation to the speed of the computer. How do the Cache memories affect the speed of the Micro-Computer.
4a. State favourable and unfavourable conditions for the implementation of the following addressing techniques: 
i.) Immediate addressing technique ii.) Register indirect addressing technique iii.) Indirect addressing technique
4b. With illustration, describe the Instruction cycle. Highlight the contributions of some registers and busses in the entire process.
5a. A computer system has a 64-bit memory-word, if 30 bits out of this memory word are used for the Operation Code, suggest a typical addressing technique for this system? Give clear reasons for your answer.
5b. Why is the binary number system most preferable to representing the internal logic of the computer system? State four advantages of Assembly languages over High level languages. 
Dept Name: Computer Science and Informatics 
Course Code: GET 201
Course Title: General Entrepreneurship concepts and practices
Lecturer: Not Known
Year: 2018/2019.
Instructions: Answer question one and any two other questions
Question One-A 
(i) Reports showing the financial affairs of a business are called________ 
(ii) The process of understanding the nature of events and making positive plans to mitigate them when such events represent threats is known as________ 
(iii) Accountants are of the opinion that a business is distinct from its owners. Which accounting assumption supports this? 
(iv) According to Kuratko et al (1990), the challenging factor that helps the managers to renew and revitalize their businesses to innovate, and to enhance their overall performance is called________ 
(v) According to  ________  an entrepreneur is a person who pays for a product to resell it at an uncertain price making decisions about obtaining and using the resources while consequently admitting the risk of enterprises 
(vi) The book used by entrepreneur for prime accounting records is called ________
(vii) One of the strategies used by an entrepreneur to manage risk is by transferring the risk to a third party called ________  
(vii) The document used by the entrepreneur for bank lodgments is called________
Question One-B 
a) Define micro, small and medium enterprises according to SMEDAN. b) According to SMEDAN 2013 survey, 
(i) What is the total number of MSMEs in Nigeria? 
(ii) Which state of the federation has the least number of small and medium enterprises?
(iii) What is the total number of persons employed by MSMEs? 
(iv) What is the percentage of women in the ownership structure of micro enterprises?
(v) What are the sources of business finance?
(vi) Mention five government policies each that positively and negatively affect micro enterprises in Nigeria.
Question Two 
a) What do you understand by entrepreneurial resources? 
b) Distinguish between an entrepreneur and intrapreneur. 
c) According to International accounting standards, IAS 1 Preparation and Presentation of Financial Statements, what are the components of financial statements? 
d) What is the relevance of time resource to the entrepreneur?
Question Three 
a) According to the economists, mention ten characteristics of an entrepreneurial revolution. 
b) Briefly discuss the history of entrepreneurship during the period of agricultural revolution. 
c) According to Osalor (2008) people of the Ibo community in Nigeria are considered one of the oldest entrepreneurs in history. Do you agree with this assertion? Explain. 
d) What is risk? Mention the types of risk facing the entrepreneur.
Question Four
 	a) The field of entrepreneurship is yet to develop a single, modern theory of entrepreneurship; hence current theories of entrepreneurship have centred on either opportunity recognition or the individual entrepreneur. Mention these theories. 
b) Mention the contents of an article of association and memorandum of association as necessary documents to the entrepreneur in the formation of a company. 
c) Explain the relationship between entrepreneurship education and entrepreneurship training.
d) The concept of time management is a misnomer. Explain.
Question Five 
a) Mention five strategies for effective time management by the entrepreneur. 
b) There are certain criteria for a good business opportunity; mention five of them. 
c) A business idea must satisfy certain conditions. Mention some of these conditions according to Richards and Okwa (2011). 
d) Mention the areas of specialization by the early entrepreneurs.


Dept Name: Computer Science and Informatics
Course Code: CSC 208
Course Title: Introduction to sequential programming
Lecturer: Not known
Year: Not known
2. Write a python program that converts Nairu to U.S Dollar. Do this by prompting user to enter the amount of naira to be changed, and the current exchange rate. Make use of well-defined function and appropriate variable names. 
3. Write a python program that finds the area of a trapezium is A = ½ (a + b) h where, a and b = bases of trapezium and, h = height. Do this by defining a function and using appropriate variable names that get values as input from users. (10 marks).
4. str= “Hello World!”, from the statement write print statements that
Prints complete string
Prints first character of the string
Prints characters starting from 3rd to 5th
Prints string starting from 3rd character to the end
Prints strings two times		(10 marks).
5. Pythagorean Theorem says that A2 +sideB2 = sideC2: Write a python program to find sideA. Assign sideB the value of 3.5 and sideC the value of 7.2. (10 marks)
Dept Name: Computer Science and Informatics
Course Code: CSC 204/214
Course Title: Computational Science and Numerical Methods
Lecturer: Not known
Year: Not known

SECTION A
1a) Write on any four types of errors that you have studied.  
1b)Numerical software should run under all circumstances, should yield correct results within an acceptable error or should fail gracefully if not successful. Describe the implementation of such programs that would achieve this.  
2a) Evolve codes to generate and print the sum and average of some elements of a Fibonacci Series. The series should terminate if the value of the last term exceeds 100.
2b) Isaac Newton devised a clever method to easily approximate the square root without having to use a calculator that has the square root function. Describe this method with illustration.
3a) Evaluate the square root of 13 using Newton-Raphson’s method. Take note of any convergence and terminate iteration.
3b) Write a C++ program to evaluate 3a above.  
SECTION B
4a) Identify any four sources of errors in numerical analysis.  
4b) The length of a rectangular piece of land is measured to be 145 ft ± 4 in. What is the relative error Er in this measured value?  
5a) What is the difference between Round-off and Truncation errors? What problems can be created by round-off errors?  
5b) Obtain an approximate value for the root of F(X) = X² - 11.

Dept Name: Computer Science and Informatics
Course Code: CSC 403
Course Title: Organization of Programming Languages
Lecturer: Not known
Year: Not known
SECTION A
1a) Write a program that uses three functions named circle, cube, and sphere to calculate the area of a circle, volume of a cube and volume of a sphere respectively. The program prompts the user to select one of the functions and prompts the user to enter the dimensions. Use any programming language that you are conversant with.  
1b) For two programming languages of your choice amongst Python, BASIC, C++ and Java, briefly discuss and evaluate their typing and typecasting disciplines.  
2a) Write short notes on any five lexical structures of programming languages.  
2b) Enumerate and explain the four structural layers of programming languages.
2c) Mention and explain error types that occur at each structural layer.  

SECTION B 
3a) Differentiate between Imperative and Object-Oriented categories of programming paradigm.  
3b) What is Backus Naur Form? Explain the key components of a BNF.  
3c)  Discuss 3 Programming Paradigms that you know.  

4a) State and explain 4 Basic Types of Programming Errors.  
4b) With example differentiate between a Parameter and an Argument.  
4c) Many languages either forbid explicit pointer arithmetic or restrict its use. What kinds of problem are they seeking to avoid?  

5a) State reasons for studying \"Organization of Programming Languages\".  
5b) With illustration, identify and explain any five types of statements.  
5c) Outline the key features that a language must have to be called object-oriented. Further, briefly discuss to what extent one programming language of your choice amongst C, C++, and Java has them.  

6a) Discuss the reasons why Old languages such as Fortran, Algol and PL/I designed in 1950s and 1960s are less widely used than languages designed in the last 20 years.  
6b) State and discuss five criteria used to evaluate Programming Languages.  
6c) Differentiate between a subroutine and a function. What are the representations of subroutines in C++ and Java?




Dept Name: Computer Science and Informatics
Course Code: INF 405
Course Title: Database Administration and Management
Lecturer: Dr Okardi
Year: 2024/2025
Instruction: Answer Question 1 and any Other Three
1a) The users of a DBMS can be broadly categorized as administrators, designers and end users. Discuss. (5 marks)  
1b) What is Entity Relationship Model? (5 marks)  
1c) Differentiate between weak and strong entity. (5 marks)  
1d) Explain the following terms: key attribute, composite attribute, Multivalued Attribute, Derived. (5 marks)  
1e) State two advantages and three disadvantages of indexing databases. (5 marks)  

2a) Write short note on Database Storage System. (10 marks)  
2b) With the aid of a diagram, explain RAID.  

3a) Describe the different stages involved in query processing in a database management system. (10 marks)  
3b) Explain how query optimization improves performance. Explain two performance optimization techniques (5 marks)  

4a) Optimize the SQL query below for performance and suggest two other optimization techniques that can be used on it.  
SELECT *
FROM Sales
WHERE Region = 'West'
AND OrderDate > '2024-01-01';
(10 marks)  
4b) What is a transaction in a database? Explain the ACID properties of a database. (5 marks)  

5a) With the aid of a diagram, describe 5 states of a transaction. (10 marks)  
5b) What is a deadlock? (5 marks)

Dept Name: Computer Science and Informatics
Course Code: CSC 301
Course Title: Structured Programming
Lecturer: Dr Ikrigo
Year: 2022/2023
1)(a) Write a short note on the three types of control structures? (7.5 marks)  
(b)  Using a C struct, write a program that accept from the user the radius of a circle as a floating-point number and calculate the circle’s diameter, circumference and area? Use the formulas: diameter = 2r, circumference = 2𝜋r  and area = 𝜋r2, Where r is the radius of the circle and 𝜋 is a constant equals 3.14159 (10 marks)
2(a) Discuss the term Structured Programming and give two examples. (4.5 marks)
	(b) State five important features of C programming language? (5marks)
	(c) Write a C program that accepts two numbers using two floating-point numbers and compute the square of both numbers using a function that does not return a value? (8 marks)  
3(a) What is the syntax for declaring an array variable of any size in C language (4.5 marks)
	(b) Explain with example, how to reference the values stored in a regular array of any size (5 marks)
(c) With example, how do you assign an array points = {7,3,6,2,8,5} to a pointer variable and display each element of the array? (8 marks)
4(a) Write a C program that initialize the value of the radius of a sphere with any floating-point number of your choice, calculate and display the volume of that sphere using a programmer-defined function called sphereVolume? Use the formula: volume = 4/3 * π * r³
Where r is the radius of the sphere and 𝜋 is a constant equals 3.14159 (10 marks)
(b) With example, how do you initialise three integer members of a structure named “scores” in C language and now to access their values? (7.5 marks) 
5(a) Explain executable statement in C ? (2.5 marks)
	(b) What is the syntax for declaring a structure in C language? (3 marks)
	(c) What is the difference between a regular user-defined function and a recursive function? (4 marks) 
	(d) Using a recursive function, write a C program that accepts an integer and displays the results in descending order order and terminate at value zero (marks)
Dept Name: Computer Science and Informatics
Course Code: CSC 203
Course Title: Web Programming I
Lecturer: Not Known
Year: 2022/2023
Instructions: Answer Question 1 and any other two Questions   
1(a) Create a HTML form for a user registration page.  
With the following fe users of a DBMS can be broadly categorized as administrators, designers and end users. Discields:  
First Name (text input), Last Name (text input), Email Address (email input), Password (password input), Gender (radio buttons for Male and Female options), Date of Birth (date input), Country (select dropdown with at least three country options), Terms and Conditions (checkbox), Submit button to submit the form.  
(20 marks)

(b) Create a HTML Login Form.  
- With the following fields:  
  - Email Address, password, and a login button.  
  - Create a html hyperlink to links both Registration Page and login Page.  
(10 marks)  
(2) Write a HTML code snippet to showcase the following
(a) How do you create an unordered list in HTML?  
(b) How can you add CSS styles to HTML elements?  
(c) How do you create a table with two rows and three columns in HTML?  
(20 marks)

(3) Explain the following web concepts
(a) What is a web browser and name three popular web browsers?  
(b) What is HTML and CSS and how is it used in web development?  
(c) Explain the client-server model in the context of the web.  
(d) Describe the difference between static and dynamic web pages.  
(20 marks)

(4) Write CSS code snippets  
(a) that styles all paragraphs with a background color to light gray, font size of 16 pixels, a blue text color, and a bold font weight  
(b) that styles all heading (h1) to font color blue, font-size to 32px and font-weight to bold  
(20 marks)

(5) Explain the following web concepts
(a) What is the difference between front-end and back-end web development?  
(b)Explain the role of HTML, CSS, and JavaScript in web development.  
(c)How does the client-server model work in the context of web development?  
(d) What is a URL and what information does it provide?  
(20 marks)





Dept Name: Computer Science and Informatics
Course Code: CSC 405
Course Title: Management Information System
Lecturer: Mrs Modupe
Year: 2024/2025

Instructions: Answer question 1 and any other three questions  
1a) With a suitable diagram, explain the OSI reference model and the functionality of each layer.  (10 marks)
	ii) Mention the names of the layers where the following protocols and network devices operate:  (i) HTTP  (ii) SMTP  (iii) IP  (iv) Hub  (v) Cable  (vi) Router  (vii) NIC  (7 marks)  
	b) Highlight five general purposes of network devices. (5 marks)
	c) Explain the difference between IP address and MAC address.  (3 marks)  
	2a) What is topology? Explain the three most popular LAN topologies namely Bus, Ring, and Star topology.  (7 marks)
	ii) State two disadvantages of the network topologies explained in (2ai) (4 marks)  
	b) Distinguish between guided and unguided transmission media. (2 marks)
	c) Describe two examples of each of the media described in (2b). (2 marks)
	3a) Explain the TCP/IP model with appropriate protocols on each layer. (8 marks)  
	ii) Enumerate the significance of the layered architecture. (2 marks)
	b) Classification of computer networks depends on three characteristics, mention them. (3 marks)
	c) Differentiate between IPv4 and IPv6 address.  (2 marks)  
	4ai) What do you understand by layered architecture in the context of computer networks?  (2 marks)  
	bi) Describe the following network devices: (i) Switch (ii) Hub (iii) Router  (6 marks)
	ii) Differentiate between full and partial mesh topologies.  (2 marks) 
	c) Explain briefly the three transmission modes.  (5 marks)  
	5a) Briefly explain IPv4 address classes  (5 marks)  
	bi) Write a short note on the following: (i) Protocol (ii) Routing (iii) Synchronization (3 marks)  
	ii) What is meant by error control and which layer of the OSI model is responsible for this? (2 marks) 
	c) With the aid of a diagram. Explain the basic components of a communication system. (5 marks)
Dept Name: Computer Science and Informatics
Course Code: CSC 405
Course Title: Management Information System
Lecturer: Mrs Modupe
Year: 2024/2025
Instructions: Answer four (4) questions  		Time Allowed: 2 hours  
1)(a)What is Human-Computer Interaction (HCI)?  (3 marks)
	(b) What is Heuristic in the context of Human-Computer Interaction? (5.5 marks)
	(c) Discuss the three heuristics components  (6 marks)
	(d) State the importance of user interface in interactive system development  (3 marks)
	2)(a) What are the parties involved in the development of a software product? (5 marks)
	(b) Discuss the three basic components of Human-computer Interaction  (6 marks)
	(c) List two (2) goals of Human-Computer Interaction  (3 marks) 
	(d) Why is physical design important in interactive system design?  (3.5 marks) 

3)(a) What is task analysis in the context of Human-Computer Interaction? (5.5 marks)
	(b) What is usability an important concept in graphical user interface design?  (3 marks)
	(c) State five components of usability  (5 marks)  
	(d) Discuss two (2) key cognitive processes involved in HCI  (4 marks)  
	4) (a) List three (3) factors an HCI designer must consider before building an interactive system (3 marks)
	(b) What is the difference between user interface design (UID) and user experience (UX) design?  (6 marks)
	(c) Why are design rules important in interactive system implementation? (5.5 marks) 
	(d) Outline three (3) types of design rules  (3 marks)  

5) (a) What is design in Human-Computer Interaction (HCI)?  (4 marks)
	(b) What is the difference between architectural design and detailed design?  (5 marks)
	(c) Describe the software development lifecycle as related to HCI  (5.5 marks)  
	(d) State three (3) methods of extracting requirement specification for interactive system design  (3 marks)  
	6)(a) What is windowing system  (5.5 marks) 
	(b) Discuss two main materials required in interaction design  (5 marks)
	(c) State three (3) benefits of windowing system  (3 marks)
	(d) Discuss the two (2) essential components of user interface (UI)  (4 marks)



Dept Name: Computer Science and Informatics
Course Code: INF 401
Course Title: Introduction to Software Engineering
Lecturer: Dr Promise
Year: 2024/2025
SECTION A 
1)  Justify or refute the following statements with reasons:  
a) Programming in the large is a design issue.  
b) Operating procedures may not be part of software.  
c) Sand boxes are used for software development.  
d) Software architecture is also known as low level design.  
e) FP based estimate is more objective than LOC based estimate.  
f) In the Spiral model, a prototype is produced at the end of the risk analysis phase.  
g) Software cost estimation is best performed at the middle of the software project.  
h) Module Integration is more tedious than Module development.  
i) Alpha test is conducted at the Customers' site.   
2)  A software project has the following parameters: External Inputs – 6 with low complexity and 7 with high complexity. External Outputs: - 13 with low complexity and 8 with average complexity. External Enquiries: - 6 with average complexity and 9 with high complexity. Internal Logical Files: - 11 with low complexity, 6 with average complexity and 5 with high complexity. External Interface Files: - 9 with low complexity and 5 with high complexity. In addition to the above: i) Online master file update is moderate ii) Complex internal processing is incidental iii) System design consideration to run in an existing heavily utilized operational environment is significant. iv) Code reuse is average v) Conversion and installation had no influence vi) Incident online update of master files vii) vO and Enquiries files are essential. Other complexity adjustment factors are treated as incidental. Compute the function points for the project. Hint: Use the attachment of Appendix A.  (20 marks)  
SECTION B
3a) Write short notes on four methods/techniques of software requirements elicitation.
	3b) When is it advisable to use software prototypes? Discuss any four types of prototypes.  
	3c) Explain the following terms: i) term Configuration Management ii) Milestone iii) Deliverables  
	4a) Describe the General Software Development Process in brief.  
	4b) Write short notes on the following: i) Modular Interconnection Languages ii) Cohesion iii) Coupling  
	4c) Write on any four software project teams. 
	5a) Define the meaning of software quality and detail the factors which affect the quality not productivity of a software product?
	5b) State any three risks associated with Software Project Planning and Estimation and ways to mitigate these risks.  
	5c) With examples, differentiate between functional and non-functional requirements. 
	6a)  List and explain four reusable software components. Discuss four characteristics of these components.
	6b) Discuss four properties of the Pipes and Filters architectural style.  
	6c) State the difference(s) between Functional and Imperative Programming.  

Dept Name: Computer Science and Informatics
Course Code: INF 403
Course Title: IT Process and Project Management
Lecturer: Mrs Temitope & Mrs Modupe 
Year: 2024/2025
SECTION A
1a) As a project manager, you have been given a mandate to prepare a proposal for building an MTN mask at West Campus Federal University Otuoke, vividly discuss the Five stages of Project Management as it relates to the mandate.  (15 marks)
	b) Briefly discuss three components of project report.  (2.5 marks)
	2a) What is Project Management?  (4.5 marks)  
	b) Discuss three components of Project Management (use diagram where necessary). (6 marks)  
	c) In your own words, explain seven components of Project Formation.  (7 marks)  
	3a) What is feasibility study and of what importance is it to project managers?  (1.5 marks)
	b)Explain Five areas of feasibility study.  (10 marks)  
	c) Discuss the differences between Industrial Projects and Developmental projects under any three headings e.g. objectives.  (6 marks)
SECTION B
Instructions: Answer all questions in this section  

	4) Microtech company is planning a software project using the critical path method (CPM), the project activities, and their durations, with their immediate predecessor activities are stated in the table below:  
| Activity | Preceding Activity | Duration (Months) |
|----------|--------------------|-------------------|
| A        | -                  | 2                 |
| B        | A                  | 4                 |
| C        | A                  | 6                 |
| D        | A                  | 4                 |
| E        | B                  | 3                 |
| F        | D, E               | 5                 |
| G        | C, E               | 4                 |
| H        | F, G               | 4                 |
a) Draw the network diagram for the project  (10 marks)  
	b)Determine (i) the critical path (ii) the project completion time  (9 marks)
	5ai) What is a Gantt chart?  (2 marks) 
	ii) Explain the major components of a Gantt chart  (5 marks)
	b) Discuss the advantages and disadvantages of using Gantt Charts in project management  (5 marks)  


Dept Name: Computer Science and Informatics
Course Code: CSC 406
Course Title: Compiler Construction
Lecturer: Unknown
Year: 2020/2021
Instructions: Answer 3 questions from Part One and 1 Question from Part Two.  
PART ONE 
What is tokenization? (5 marks)  
B)  Why do you prefer to use High Level Languages in programming? (5 marks)  
C)  With the aid of a diagram, explain the stages of compilation. (10 marks)  
2) Write out the tokens in the variable declaration statement: int value = 100; (5 marks)
B) Mention commonly used compiler construction tools. (5 marks)  
C) What are the roles of a parser  (5 marks)
D) Where can compiler technology be applied?  (5 marks)
3A) The use of finite automata solves the problem of not verifying the validity of regular expression. Justify this statement with an example. (5 marks)  
B) Differentiate between Deterministic Finite Automata and Non-deterministic Finite Automata. Give suitable examples if necessary. (5 marks)  
C) Mention 3 examples of lexical error and syntax error. (5 marks)  
4A)  What is a context free Grammar? Give detailed explanation. (10 marks)  
B) Give detailed explanation of the three possible operations on languages. (10 marks)  
PART TWO
	5) Construct DFAs for the following regular languages: The alphabet is (a, b)  
	A) The set of strings where the number of b’s is a multiple of 3. (and there can be any number of a’s)  
	B) Give a detailed explanation of the symbol table (4 marks)


Dept Name: Computer Science and Informatics
Course Code: CSC 412
Course Title: Web Application Development
Lecturer: Unknown
Year: 2020/2021
Exam Instruction: Attempt Question 1 and any other 2 questions
1) State five significances of JavaScript in web application programming. (10 marks)  
	b) State five differences between JavaScript and HTML. (10 marks)  
	c) JavaScript can be included directly within the HTML document or linked from an external file. With 3 solid points, state why, in general, it is more efficient to reference the JavaScript file instead of embedding it inline. (10 marks)  

2) There are seven lines of code in the JavaScript below.  
	a) Explain line by line what each line of code does (15 marks). 
	b)  Make a summary of what the entire code is about (5 marks).  
var numbers = [5, 6, 2, 14, 1, 7, 3, 10, 9, 12];
	var sumNumbers = 0;
		for (var i = 0; i < numbers.length - 1; i++) {
			sumNumbers = sumNumbers + 3*numbers[i] - 2;
			if (sumNumbers % 2 == 0) {
				  sumNumbers = sumNumbers / 2; 
			 }
}
	console.log(\"sumNumbers\")
3) Write a simple web application using HTML and JavaScript
	a) That generates Numbers 1-20 (15 marks)  
	b)  Sketch the Wireframe for the web app (5 marks)  
	4) Write a simple web application using HTML and JavaScript  
	a) that allocates groups having \"n\" Members per group for a class size of 150 students (15 marks)  
	b) Sketch the Wireframe for the web app (5 marks)  
	5)  Write a simple web application using HTML and JavaScript  
	a) That allocates Seat Numbers to 150 Exam students (15 marks)  
	b) Sketch the Wireframe for the web app (5 marks)
Dept Name: Computer Science and Informatics
Course Code: INF 404
Course Title: Management Information system
Lecturer: Unknown
Year: 2020/2021
Exam Instruction: Attempt Question 1 and any other 3 Questions  
PART A: ANSWER ALL QUESTIONS (10 Marks)
1a. Explain five uses of information (5 Marks)
1b. Explain the three categories of Information (5 Marks)
1c. Differentiate among Batch processing, Online Processing and Real time processing with suitable examples (6 Marks)
1d. Organization responds to both environment and technological changes is caused by three minor business pressure. Explain (4 Marks)
2a. Briefly explain the components of Management Information system (6 Marks)
2b. Explain four justifications of MIS (5 Marks)
2c. Explain data hierarchy and its succeeding levels (5 marks)

PART B: ANSWER ANY FOUR QUESTIONS (15 Marks Each)
3a. Differentiate between MIS and Information system (3 Marks)
3b. Differentiate between computer system and information system (3 Marks)
3c. Briefly explain four desirable qualities of Information (4 Marks)
4a. What is Management Information System? (3 Marks)
4b. Enumerate four reasons why ERP is helpful in managing on organization. (4 Marks)
4c. What is Enterprise Resource Planning (ERP) system? (3 Marks)
5a. What is a Terminal (2 Marks)
5b. Explain four characteristics of MIS (4 Marks)
5c. Explain three types of Terminals you know (4 Marks)
6a. What is Information processing? (3 Marks)
6b. Differentiate between E-Business and E-Commerce (3 Marks)
6c. Explain three roles of MIS in an organization (4 Marks)
7. Write short note on the following (2.5 Marks Each)
 A) Automated Teller Machine B) Encryption C) Firewall D) Vulnerability 

Dept Name: Computer Science and Informatics
Course Code: CSC 404
Course Title: Algorithms and Complexity analysis
Lecturer: Unknown
Year: 2020/2021 

Instruction: Answer four questions only; SECTION A is compulsory

SECTION A
1. Consider Insertion-Sort and Merge-Sort. For each algorithm, what will be the worst case bound on the running time if you know additionally that:
i. the input is already sorted?
 ii. the input is reversely sorted?
 iii. the input is a list containing n copies of the same number?
2. Present an algorithm that searches an unsorted array a[1 : n] for the element x using standard notations. If x occurs, then return a position in the array, else return zero.
 Develop the algorithm using the C++ programming language.

SECTION B
Write the algorithm for each of the following:
3a. An algorithm that finds the largest number possible from a given set of numbers.
 b. An algorithm that merges two sorted linked lists from their end.
c. State and explain three benefits of analyzing algorithms.
 d. Find upper bounds for: f(n)=n2+1f(n) = n^2 + 1
4. Write short notes on the following:
 a. Best case
 b. Average case
 c. Worst case
 of algorithms using relevant notations.
4b. Compare and contrast the performance of binary search and tree search algorithms.
5a. When is an algorithm said to be Greedy? List the characteristics of Greedy Algorithms.
 5b. Explain the general principles that should be adhered to when writing algorithms.
6. Program correctness is akin to good detailed algorithm, discuss.
b. Write short notes on the following:
 a. Dynamic Programming
 b. Divide and conquer
 c. Recursive algorithms
 d. Asymptotic Analysis of Algorithms
`;

export const SUPPORTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  TEXT: ['text/plain']
};

export const ALL_SUPPORTED_MIME_TYPES = [
  ...SUPPORTED_FILE_TYPES.IMAGE,
  ...SUPPORTED_FILE_TYPES.DOCUMENT,
].join(',');


export const initialPastConversations: PastConversation[] = [];

export const welcomeMessage: ChatMessage = {
  id: 'welcome-0',
  sender: 'bot',
  text: "Hello! I'm your AI Exam Prep Assistant for the Department of Computer Science and Informatics. How can I help you study today? You can ask me to generate questions from past papers, explain concepts, or discuss topics from your courses.",
  timestamp: new Date(),
};

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
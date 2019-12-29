#include <GL/glut.h>
void init(void){
	GLfloat light_position []={ -3.0, 1.0, 1.0, 0.0 };
	GLfloat mat_diffuse[]={ 1.0, 1.0, 1.0, 1.0 };
	glClearColor(0.1, 0.1, 0.1, 0.0 );
	glShadeModel(GL_SMOOTH ); 
	glMaterialfv(GL_FRONT, GL_DIFFUSE, mat_diffuse);
	glLightfv(GL_LIGHT0, GL_POSITION, light_position);
	glEnable(GL_LIGHTING);
	glEnable(GL_LIGHT0);
	glEnable(GL_DEPTH_TEST);
	return;
}
void display(void){
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glutSolidSphere(0.75,100,100);
	glFlush();
	return;
}
int main(int argc, char *argv[]){
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_RGB | GLUT_SINGLE);
	glutInitWindowPosition(100, 100);
	glutInitWindowSize(1000, 1000);
	glutCreateWindow(argv[0]);
	init();
	glutDisplayFunc(display);
	glutMainLoop();
	return 0;
}

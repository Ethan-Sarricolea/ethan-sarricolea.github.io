# Git y Github

En estas notas de mi curso de Meta para control de versiones, logre contener los conceptos mas importantes de git y github y entrar en mas detalles del uso correcto de estas herramientas para el desarrollo.

# Indice

1. [Crear un repositorio](#crear-un-repositorio)
2. [Clonar un repositorio](#clonar-un-repositorio)
3. [¿Cómo funciona Git?](#como-funciona-git)
    1. [Carpeta ".git"](#carpeta-git)
    2. [Flujo de trabajo](#flujo-de-trabajo-de-git)
        1. [Modificado](#modified-o-modificado)
        2. [preparado](#staged-o-preparado)
        3. [Confirmado](#commited-o-confirmado)
4. [Añadir y confirmar](#añadir-y-confirmar)
    1. [Add](#git-add)
    2. [Restore](#git-restore)
    3. [Commit](#git-commit)
5. [Ramas](#ramas)
    - [Concepto: Solicitud de extracción](#concepto-solicitud-de-extracción)
    - [Comparar y solicitar extracción](#solicitud-de-extracción)
    - [Git pull](#git-pull)
6. [Local a remoto](#local-a-remoto)
    - [Git init](#git-init)
    - [Git remote](#git-remote)
    - [Git checkout](#git-checkout)
    - [Autenticación CLI](#autenticación-cli)
7. [Resolver conflicto](#resolver-conflicto)
    - [Ramificación de funciones](#ramificación-de-funciones)
* [Resumen de pasos](#pasos-en-git-y-github)
8. [HEAD](#head)
9. [DIFF](#diff)
10. [BLAME](#blame)
11. [Bifurcaciones](#bifurcaciones)

## Crear un repositorio

Luego de iniciar sesion en el sitio web GitHub se puede seleccionatr la opcion de crear repositorio en la interfaz grafica, con ello se dara la opcion de rellenar los campos de un nuevo repositorio, colocando el nombre, el tipo de visibilidad y la descripcion, estos parametros pueden ser modificados posteriormente a su creación. Posteriormente se puede agregar ciertos archivos como el archivo `README.md` y `.gitignore`, ademas de escoger una licencia si se requiere.

## Clonar un repositorio

En las opciones de la interfaz grafica de GitHub se puede clonar un repositorio seleccionando el botón verde **code**. se tienen dos opciones:

- HTTPS: Esta opcion contiene la URL del HTTPS del repositorio, con este se puede hacer la clonacion de un repositorio mediante el comando `git clone`.

Se debe escribir en terminal el siguiente comando:

    git clone https:/github.com/....git

Se debe tomar en cuenta que el repositorio se clonara en la carpeta a la que esta apuntando la terminal.

- SSH: Para utilizarla se debe configurar las claves SSH y asignarlas a las cuentas de usuario

- CLI: Esta opcion ademas, tiene opciones adicionales para GitHub Desktop

- ZIP: Se puede descargar el archivo zip desde el repositorio

## Como funciona Git

Al clonar un repositorio en la carpeta se crearan 2 archivos, un archivo `.git` y un archivo `README.md` (si se especifico)

- **README.md**: Este archivo (por su traduccion al español "LEEME") Es un archivo muy usado en GitHub para presentar informaciónde un repositorio, es escrito en un lenguaje de marcado sencillo llamado **Markdown**.
- **.git**: Es una carpeta *oculta* usada para realizar un seguimiento de todos los cambios. En linux, cualquier carpeta cuyo nombre inicie con un punto es una carpeta oculta, esta carpeta se crea automaticamente al crear un repositorio.

### Carpeta Git

LA carpeta `.git` se inicializa al usar el siguiente comando:

        git init .

Siguiendo los ejemplos, como el repositorio se creó en GitHub, no era necesario ejecutarlo, ya que GitHub manejo todo esto como parte de su flujo de creación de nuevo repositorios.

### Flujo de trabajo de Git

Git usa flujos de trabajo que pueden dividirse en tres estados que serán repasados a continuación.

#### Modified o Modificado

En este primir estado, `agregar`, `eliminar` o `actualizar` cualquier archivo dentro de un repositorio se considera un estado modificado, Git nota las modificaciones pero no las rastrea, por lo que entra en juego el estado de preparación.

#### Staged o Preparado

Para que Git pueda rastrear un archivo, debe colocarse en la zona de preparación.

        git add [archivos]

Una vez añadido se realiza el seguimiento de las modificaciones ofreciendo un recurso de seguridad antes de la confirmación de los cambios.

#### Commited o Confirmado

Confirmar un archivo es, en escencia, un punto de guardado.

        git commit -m [texto de confirmación]

Git guarda el archivo y tendrá una instantánea de los cambios actuales.


##### Ejemplo:

Se **modifica** el repositorio local o directorio de trabajo, luego este se agrega desde el directorio a la zona de **preparación** (`git add`). A partir de ahí, se **confirma** (`git commit`) el archivo y luego se envía al repositorio remoto.
Una vez confirmado el o los archivo/s estos pueden ser enviados al repositorio remoto con el comando `git push`.

Hay otras opciones accesibles desde el repositorio remoto, para recuperar el archivo y retirarlo (`git fetch`) o, tambien se puede fusionar a un directorio de trabajo (`git checkout`).

## Añadir y confirmar

Una vez en el repositorio local o directorio de trabajo, es ideal comprobar si hay algun cambio o commit en el momento antes de realizar alguna modificación. Para ello se utiliza el siguiente comando:

        git status

Salida si no hay cambios:

        On branch master
        Your branch is up to date with 'origin/master'.

        nothing to commit, working tree clean

Este comando muestra como salida la rama en la que nos encontramos, además indica que la rama esta actualizada y con que origen (los archivos son los mismos que el repositorio remoto). Por ultimo, muestra si hay alguna confirmacion que realizar, es decir, el status del directorio.

Si realizamos un cambio, es decir, eliminamos, agregamos o actualizamos un archivo, git lo notara y al usar el comando `git status` nos lo indicara.

Salida si hay cambios (agregando un archivo con el comando `touch file.txt`):

        On branch master
        Your branch is up to date with 'origin/master'.
        
        Untracked files:
        (use "git add <file>..." to include in what will be committed)
        file.txt

Este mensaje indica que hay un archivo sin seguimiento, es decir preparar para la confirmación.

### Git add

Este comando tiene como proposito, utilizar el prompt de git para que sepa que quiero rastrear determinados archivos e incluirse como parte de mi **commit**.

Siguiendo el ejemplo anterior, se puede agregar este archivo para la confirmación con el comando `git add` agregando el nombre del archivo, tambien es posible utilizar el **.** para indicar que se agreguen todos los archivos modificados, quedando el comando como `git add .` o `git add file.txt`.

Ejecutando nuevamente el comando de estatus esta es la salida en terminal:

        On branch master
        Your branch is up to date with 'origin/master'.
        
        Changes to be committed:
          (use "git restore --staged <file>..." to unstage)
                new file:   file.txt

Se puede observar que se notifica que las ramas están actualizadas y que, además, los cambios estan preparados para su confirmación.

#### Git restore

En la salida anterior, tambien se indica que en caso de querer restaurar los cambios se utilice el comando `git restore --staged file.txt` para este caso (se remplaza "<file>" por el nombre del archivo); ejecutar ese comando eliminara el archivo del commit, por lo que si se ejecuta nuevamente el comando de estatus, se notificara nuevamente que el archivo esta sin seguimiento.

### Git commit

El area de preparación es realmente importante porque en escencia se está preparando para obtener todos los archivos y sus cambios, de los que se desean como parte de cualquier función en la que esté trabajando.
En resumen, con los pasos anteriores está preparando el contenido para el commit; tambien hay que tomar en cuenta que hasta ahora, **esto es solo en el repositorio local**. Ahora veremos un ejemplo del funcionamiento del comando **git commit**:

        git commit -m "First commit"

El modificador `-m` o **mensaje** indica que se escribira un mensaje que será adjuntado al commit, en respuesta la terminal arrojara una salida similar a la siguiente:

        [master e7e8638] commit de prueba de mi curoso de control de versiones
         2 files changed, 1 insertion(+), 2 deletions(-)
         create mode 100644 file.txt

El mensaje indica que hay 2 archivos cambiados, 1 inserción y 2 eliminaciones, además indica que se creo el archivo *file.txt*. Posteriormente al ejecutar el comando de estatus la terminal mostrará que no hay nada por confirmar, como fue visible antes de las modificaciones.

Los cambios se suben al servidor utilizando el comando `git push`, esto es indicado en el mismo mensaje de estatus. Esto al hacer un cambio en el repositorio remoto no es necesario, pero estando en el respositorio local sera necesario especificarlos.

En otras palabras, las modificaciones, preparaciones y confirmaciones en un primer momento se suelen hacer desde el repositorio local con los comandos anteriormente vistos (add y commit) una vez confirmados los cambios, estos son subidos al repositorio remoto al que tienen acceso el equipo de desarrollo con el comando `push`.

## Ramas

Con el comando de estatus podemos confirmar que no hay cambios pendientes por confirmar, ademas se nos indica que la rama principal de origen, que siguiendo el ejemplo se llama **master**, esta actualizada.

En GitHub se pueden crear diversas ramas de acorde al proyecto que se esta realizando, esto se hablara con mayor profundidad posteriormente.

Para crear una nueva rama se utiliza el comando `git checkout -B 'feature/lesson'`. También se puede utilizar el comando `git branch nombre`. ambos crean una nueva rama, la diferencia radica en que, **git branch** solo crea una nueva rama, mientras que **git checkout** es utilizado para moverse entre las ramas y, con el modificador **-B** mueve a la vez que crea a esta nueva rama.

Ejecutar el comando `git branch` muestra en la salida de la terminal las ramas existentes, y de manera resaltada, sumado a el simbolo **(*)** del lado izquierdo.

        development
        * master

En el ejemplo anterior, primero se ejecuto el comando `git branch development` para crear una rama con el nombre **development**, posteriormente se utilizo el comando `git branch` para ver las ramas existentes, arrojando la rama principal o 'master' y la nueva rama creada (development). Ya que no se uso el comando *checkout*, para realizar cambios en la rama 'development', es necesario "moverse" a ella con el anterior comando mencionado.

Pero antes de continuar, es importante remarcar que en la rama principal no hay conocimiento de los cambios, ya que eston son en el repositorio local, es decir, existen de forma aislada; por lo que incluso al enviar el codigo al repositorio principal no se detectaran los cambios. La nueva rama necesita fusionarse de nuevo con la rama principal para reconocer los cambios en la rama creada **development**, en este punto es donde se realiza una solicitud de extracción.

### Concepto: Solicitud de extracción

Su objetivo es obtener una revisión entre compañeros de los cambios realizados en la rama. En otras palabras, para validar que los cambios sean correctos; al codificar muchos equipos tendrá conidiciones que cumplir de acuerdo a las pruebas de unidades  y las pruebas de integración.

Estas condiciones suelen incluir la posibilidad de validar que se han cumplido las normas necesarias para realizar la fusión de nuevo con la línea principal. Los equipos tambien comprobaran cualquier cuestión que pueda haberse pasado por alto.

Una vez entendido, el disuignte paso es añadir un archivo a la nueva rama, para proseguir con el ejemplo se va a crear un archivo de texto simple, pero primero, es necesario encontrarse en la rama, para ello se utilizara el comando `git checkout development` para moverse a la rama.

        Switched to branch 'development'

Una vez que nos encontramos en la rama podemos agregar un archivo nuevo con el comando `touch file2.txt` para este ejemplo, una vez modificada la rama podemos agregar y confirmar los cambios con los comandos ya vistos.

Una vez confirmado el archivo, se envian los cambios al repositorio remoto con `git push -u origin development`. En este caso se indica que el origen ya no sera la rama principal, sino la rama 'development'

Cuando se intente realizar cambios con este comando es posible que le soliciten sus datos para inicio de sesión, una vez terminado ese proceso, GitHub reconocerá la nueva rama añadida y pedira crear una solicitud de sondeo, que puede ser comparada con otra rama, en este caso con la rama principal.

El siguiente paso es abrir la interfaz de usuario de GitHub para realizar un **compare and pull request**.

## Comparar y solicitud de extracción

Siguiendo el ejemplo anterior, una vez realizados los cambios y ya en la interfaz grafica de GitHub, hacemos click en el botón **compare &pull request**.

### Solicitud de extracción

Una solicitud de extracción permite que el equipo tenga conocimiento de que se realizaron nuevos cambios que queremos que revisen y que yo también quiero aprobar o solicitar cambios en la solicitud de sondeo propiamente dicha.

Otra cosa que se debe tener en cuenta en la interfaz de usuario de GitHub es que se esta comparando con la rama principal. Escencialmente, se ha cortado una rama de la rama 'development' principal.

Dentro de la interfaz en el comparación nos indica los commits realizados. Luego se debe seleccionar la opción **Create pull request** o **Crear una solicitud de extracción**. Luego, el equipo revisará los cambios y los **aprobará** o **rechazara**.

Una vez **aprobados**, puede fusionar sus cambios a la rama principal. Esto es mucho mas ordenado en las situaciones en las que todo el mundo trabaja en la rama principal.

Es particularmente util si se trabaja con caracteristicas que etán estrechamente vinculadas entre sí. Por ejemplo, podría estar trabajando en una caracteristica que se cruza con algún codigo que requiere cambios y que, muy probablemente, sea alterada por otra persona.

El enfoque de mantener todo al nivel de la rama es mas sencillo que si todos trabajan desde la linea principal. Cuando todos trabajan en la misma rama, es más probable que haya problemas al trabajar en una sola rama principal. Tener ramas independientes permite que el proyecto sea mas facil de gestionar, además,, no hay limite de remas en un proyecto.

El equipo decide sobre las convenciones de asignacion de nombre que utilizara. En muchas ocasiones puede agregar la función de palabras claves, seguida del nombre de la rama, como una ruta url, por ejemplo "origin/master".

Para este ejemplo no tenemos compañeros para la revision, por lo que solo se puede fusionar la rama directamente, por loq eu solamente se confirma la fusión, o se hace click enn **confirm merge**. 

Una vez confirmada esta la opción de eliminar la rama, depende de usted mantenerla o eliminarla.

### git pull

Continuando el ejemplo, una vez hecho el **merge**, los cambios de la rama **development** estarán en la rama master del repositorio remoto. Sin embargo, los cambios no se mostraran en nuestra rama **master** del repositorio local, por lo que sera necesario actualizarlo. Para ello se utiliza el comando `git pull` que recolecta los ultimos cambios en la rama remota y los descarga en la rama local.


## Local a remoto

Un repositorio remoto puede ser cualquier repositorio a distancia donde los desarrolladores realizan cambios, ya sea centralizado (como los proporcionados por GitHub), o en otro dispositivo de los desarrolladores.

Por otro lado un repositorio local se refiere a una maquina, ya sea computadora postatil, de escritorio o incluso un dispositivo movil, en este solo usted tiene acceso.

Cuando se crea un proyecto, el primer paso es clonarlo por medio de la URL, este es copiado en una carpeta elegida, y una vez terminado el clon, el usuario puede hacer cambios en el proyecto y enviarlos nuevamente al repositorio remoto. Otros usuarios que trabajan en el codigo no verán los cambios en sus maquinas ya se estan trabajando en repositorios locales (los clones del codigo base), a menos que bajen los ultimos cambios del servidor.

### Git init

Para crear un repositorio local se suele utilizar el comando `git init` en la carpeta donde se desea almacenar el proyecto.

### Git remote

Al usar este comando posterior a creado un repositorio local, no se retornara ningun mensaje, pues no tiene conexión con un repositorio remoto de GitHub o algun otro servidor; El comando `git remote -v` permite ver el repositorio remoto en el que esta configurado.Para añadir la conexión al repositorio remoto se usa el comando `git remote add origin <<url>>`  colocando el nombre, aunque comunmente se utiliza `origin`, y pasando el URL.

Posteriormente se utilizael comando `git pull` para descargar los cambios.

### Git checkout

Descargados los cambios, es necesario seleccionar la rama de trabajo o crearla, para ello se utiliza el comando `git checkout <<rama>>`, colocando el nombre de la rama, que suele ser **master** o **main**.

ya conectados en una rama, se utilizan los comandos ya antes vistos para manejar el respositorio local y subir los cambios en remoto.

### Autenticación CLI

En terminal se puede autenticar la cuenta de github, de las 2 maneras que se muestran en terminal, en este caso se hablara de la autenticación por token.

Para realizar la autenticación por toquen para la clonacion por CLI, primero se debe generar un token de acceso, eso se puede hacer por medio del disugiente link: https://github.com/settings/tokens

Una vez realizado el token con el alcance minimo requerido (por ejemplo 'repo', 'read:org' y 'workflow') se debe colocar el comando `gh auth login` en terminal, donde se debe seleccionar en este caso, la plataforma github y posteriormente el protocolo HTTPS, una vez confirmado que se hara la autenticación por credencial se debe copiar y pegar el token de autenticación en la terminal.

Terminado el proceso y para clonar el repositorio por CLI se debe copiar el enlace especificado en el la interfaz grafica del repositorio en GitHub.

        Suele ser: gh repo clone <YOUR USERNAME>/<REPOSITORY-NAME> 

Con todos los pasos es posible clonar un repositorio, aunque, para realizar commits es probable que sea necesario un inicio de sesión.

## Resolver conflicto

Los conflictos pueden producirse cuando se intenta fusionar ramas conc amb ios que compoten entre sí. Git tratara de auto-fusionar, pero si hay conflictos solicitará una confirmación; los cambios que compoten deben ser resueltos por el usuario final, al proceso se le denomina **fusión o rebasamiento**.

Siguiendo un ejemplo de Git, hay 2 desarrolladores que revisarán el repositorio final el lunes por la mañana, y ambos tienen la misma copia, ambos debén comprobar una nueva  rama, para el ejemplo se les nombrara **dev1** para el desarrollador 1 y **dev2** para el segundo.

Los comandos que ejecutarían son los siguientes:

        git pull
        git checkout -b [rama]

Siguiendo el ejemplo, el desarrollador 1 realiza cambios, por ejemplo, agregando un archivo de javascript, luego envia los cambios al repositorio para su aprobación a traves de un `pull request` o **solicitud de extracción**.

        git add file.js
        git commit -m "added file 1"
        git pull origin master
        fit push -u origin dev1

Posteriormente se revisa el *pull request* y se fusiona con la rama principal. Mientras tanto el desarrollador 2 empieza a realizar su función, pasando por el mismo proceso que el desarrollador 1.

        git add file.js
        git commit -m "added file 1"
        git pull origin master

Al intentarlo, se retornara en la terminal un conflicto como el siguiente:

        From github.com:demo/demo-repo
         * branch            master       -> FETCH_HEAD
           9012934..d3b3cc0  master       -> origin/master
        Auto-merging file.js
        CONFLICT (content): Merge conflict in file.js
        Automatic merge failed; fix conflicts and then commit the result.

Una vez que se nos notifica el conflicto de fusión, es necesario arreglarlo antes de que se pueda enviar al repositorio remoto. Ejecutar `git status` tambien nos dara el mismo nivel de detalle.

Para poder fusionar, el desarrollador 2 necesita ber y comparar los cambios del desarrollador 1, es **una buena practica** ver primero que rama esta causando el problema de fusión. El desarrollador 1 ejecuta el comando `git log --merge`.

        salida de ejemplo:
        commit 79bca730b68e5045b38b96bec35ad374f44fe4e3 (HEAD -> dev2)
        Author: Developer 2 
        <developer2@demo.com>
        Date:   Sat Jan 29 16:55:40 2022 +0000
        
            chore: add dev 2
        
        commit 678b0648107b7c53e90682f2eb8103c59f3cb0c0
        Author: Developer 1 
        <developer1@demo.com>
        Date:   Sat Jan 29 16:53:40 2022 +0000
        
            chore: add dev 1

El ejemplo de salida muestra donde ocurrieron los cambios conflictivos, el desarrollador 1 ahora requiere ver el cambio que causa conflicto con `git diff`.

Con ese comando se especificaran las diferencias, git las muestra entre flechas *<<<>>>*, una vez realizadas las corrrecciones, el segundo desarrollador podra realizar su *pull request* para fusionar el codigo con la linea principal.

## Ejemplo de flujo de trabajo

El flujo de trabajo es algo comun en diversos campos de la vida laboral, como desarrollador que trabaja en un proyecto, primero se debe tomar el proyecto de un repositorio remoto para trabajar en su maquina local, esto se conoce como **bajar un proyecto** o **abrir un proyecto**. Un vez en la maquina local, se puede compilar, ejecutar y hacer cambios. Una vez terminador los cambios, estos se deben subir al repositorio remoto para que otros desarrolladores puedan verlos.

En general el proposito de este flujo es guiar al equipo, no deberia interrumpir ni poner obstaculos al despliegue o pruebas, ni a ningun otro desarrollador trabajando en el proyecto.

La eleccion de un flujo de trabajo requiere una cuidadosa consideración, dependerá del tamaño del equipo, cultura de trabajo y el producto que se va desarrollar o actualizar.

### Ramificación de funciones

Es un flujo común de trabajo utilizado por muchos desarrolladores, se refiere a la creación de una nueva rama a partir de la principal para trabajarla exclusivamente hasta finalizar la tarea.

Deben estrablecerse normas y condiciones para que la rama se mantenga en buen estado, cada base de codigo tiene un repositorio principal que es, en escencia, la fuente verdadera de la aplicación. Todos los cambios se envían directamente a la rama de funciones; la rama principal no se modifica.

Cuando esta conforme con una modificación agregada, tiene que confirma los cambios y enviarlos al repositorio del servidor. Para confirmarlos, se suben los cambios y ya que se trata de una rama de funciones, se genera una solicitud de envio.

La solicitud de envío se compara con la rama principal, asi que, los desarrolladores que revisaron el codigo pueden ver exactamente lo que se ha cambiado. Ya revisada y aprobada, se puede fusionar con la linea o rama principal.

### Pasos en Git y GitHub

1. `git pull`: Usado para bajar el ultimo codigo del repositorio remoto.
2. `git checkout -b dev/name` (dev/name es la nueva rama): Se usa para crear la nueva rama, esto con el marcador **-b**.
3. `git add` y `git commit`: Usados para agregar y confirmar los cambios de un repositorio local, en commit se usa un mensaje descriptivo para saber que se añadio (se usa el marcador **-m**: `git commit -m "mensaje"`.
4. `git push -u origin dev/name`: Se usa para subir los cambios, se suele usar el marcador **-u** antes de origin establece una rama remota de seguimiento.

## HEAD

Para saber en que rama esta actualmente, se mantiene un puntero especial llamado **Head**, que es uno de los archivos dentro de la carpeta **.git**. Este archivo hace referencia al commit actual que está viendo; 

Para identificar el commit actual en el que esta trabajando debe abrir la carpeta *.git*, utilizando comandos de terminal (*cd*) y posteriormente utilizar el comando *cat* para ver el contenido:

        ref: refs/heads/m
        HEAD (END)

Al entrar en la carpeta **.git** y utilizar el comando `cat <<rama>>` la terminal retorna un ID unico con hash de referencia del commit actual.

Al cambiar de rama, *head* se modifica para referenciar a una nueva rama. Por ejemplo, al colocar en terminal el comando `git checkout development`, nos estaremos desplazando a la rama de desarrollo, despues podemos utilizar el codigoo `git branch`, que muestra las ramas, este comando retornara las ramas y la rama en la que estamos actualmente, es decir, cuando se ejecuta el comando de comprobación, se modifica head para que haga referencia a la rama de prueba, de modo que se pueda comprobar el contenido del archivo *head* dentro de la carpeta **.git**.

Hay que introducir el ultimo comando `cat .git/HEAD` para comprobar que head ha cambiado de la rama principal a la de prueba. Tambien es importante remarcar que cuando se produce un cambio en algun archivo del directorio de una rama y se produce un commit, el UD cambiará.

###### Nota: el modificador -m en 'git commit' se usa para añadir una pequeña actualización a la linea de comandos

## Diff

El comando `git diff` va mas alla de las funciones de git status, pues este dice **cuales son exactamente esos cambios**. Es decir, *status* indica los nombres de los archivos, pero para abrir y ver el contenido es necesario usar *diff*.

Este comando compará la version anterior del archivo que se especifica con la atual para encontrar cualquier diferencia, entonces mostrara exactamente el contenido eliminado y agregado. A contiuación un ejemplo:

        git diff HEAD file.extension

El comando `git log` tambien sirve para mostrar el historial de commits, sumado al modificador `--pretty=oneline` para mostrar cada commit en una linea.

Gracias al comando *log* se puede ver el codigo de cada commit, con estos tambien se puede usa el comando *diff*.

Con el comando git diff se pueden ver los cambios entre committs, **ramas** y **archivos** **individuales**.

## Blame

El comando `git blame` se utiliza para observar los cambios de un determinado archivo y mostrar las fechas y horarios de modificaciones y que usuarios las realizaron.

        git blame <date> <file>

Ejemplo:

        $ git blame file.txt
        954b1aee (Developer1 2024-10-08 22:54:31 +0000 1) este es un nuevo texto agregado a mi archivo de ejemplo.

En el ejemplo anterior al colocar el comando blame de un archivo modificado, nos muestra  primero el *commit ID*, luego nos muestra quien, cuando y cual fue la ultima modificacion, es decir, es el ejemplo nos retorna el commit ID que es *954b1aee*, luego que el *Developer1* realizo el cambio en *2024-10-08 22:54:31* (fecha y hora) y que fue agregada/modificada una linea de texto de ubicación *+0000 1* (la primer linea) con el contenido *"este es un nuevo texto agregado a mi archivo de ejemplo"*.

Otro uso es con el modificador **-L**, con el que se debe indicar el numero inicial y final de linea, es decir, al colocar el comando `git blame -L 5,15 <file>` donde se indican las lineas que se desea visualizar, se mostrara el ID, quien y cuando se modifico de las lineas 5 a la 15. Si se utiliza **-l** se mostrara el ID en su forma completa y una salida mas detallada.

Tambien se puede utilizar el comando *blame* con el ID de un commit para ver los cambios en especifico, por ejemplo:

        git blame 954b1aee

Esto mostrará las diversas modificaciones y datos del commit.

## Bifurcaciones

Conocida como **fork**, la bifurcacion es otro tipo de flujo de trabajo, la diferencia clave entre estas y las ramificaciones, es que las bifurcaciones crean un nuevo repositorio por completo. A la hora de subir un cambio en el repositorio original por medio de un *pull requests* tendra que comprarar con el repositorio original, es decir, comparar ambos repositorios.
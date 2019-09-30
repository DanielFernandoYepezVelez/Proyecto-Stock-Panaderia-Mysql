# API-restMySQL

Landing Page =>
router.GET('/') = pagina de aterrizaje|
----------------------------------------------------------------------------------

Ingredients Views =>
router.GET('/createIngredient'); = formulario crear Ingredientes |
router.GET('/readIngredient'); = Ver Ingredientes |
router.GET('/updateIngredient'); = Ver y actualizar Ingredientes |
router.GET('/updateIngredient:id'); = formulario actualizar Ingredientes |
router.GET('/deleteIngredient'); = formulario eliminar Ingredientes |

APIs Ingredients =>
router.POST('/api/ingredient/create'); = guardar Ingredientes |
router.PUT('/api/ingredient/update/:id'); = actualizar Ingredientes |
router.DELETE('/api/ingredient/delete/:id'); = eliminar Ingredientes |
---------------------------------------------------------------------------------

Products Views =>
router.GET('/createProduct'); = formulario crear Productos |
router.GET('/readProduct'); = Ver Productos |
router.GET('/updateProduct'); = Ver y actualizar Productos |
router.GET('/updateProduct:id'); = formulario actualizar Productos |
router.GET('/deleteProduct'); = formulario eliminar Productos |

APIs Products =>
router.POST('/api/product/create'); = guardar Productos |
router.PUT('/api/product/update/:id'); = actualizar Productos |
router.DELETE('/api/product/delete/:id'); = eliminar Productos |
---------------------------------------------------------------------------------

Users Views =>
router.GET('/signup'); = formulario registrar usuario |
router.GET('/signin'); = formulario inciar sesión |

APIs Users => 
router.POST('/api/auth/signup'); = registro usuario |
router.POST('/api/auth/signin'); = incio sesión usuario |
router.GET('/api/auth/logout'); = cerrar sesión usuario |
---------------------------------------------------------------------------------

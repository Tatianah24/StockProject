import Realm from 'realm';
export const USER_SCHEMA = "User";
export const FRS_SCHEMA = "Fournisseur";
export const ARTICLE_SCHEMA = "Article";
export const CATEGORIE_SCHEMA = "Categorie";
export const FOURNIR_SCHEMA = "Fournir";
export const CASIER_SCHEMA = "Casier";
export const SORTIE_SCHEMA = "Sortie";
export const MONNAIE_SCHEMA = "Monnaie";
export const TYPE_SCHEMA = "Type";

//Utilisateur schéma
export const UserSchema = {
    name : USER_SCHEMA,
    primaryKey : 'id_user',
    properties:{
        id_user:'int',
        name_user:'string',
        email_user:'string',
        pwd_user:'string',
        pass_user:'string',
    }
};
//Fournisseur schéma
export const FrsSchema = {
    name : FRS_SCHEMA,
    primaryKey : 'id_frs',
    properties:{
        id_frs:'int',
        nom_frs:'string',
        prenom_frs:'string',
        tel_frs:'string',
        adresse_frs:'string',
    }
};
//Article schéma
export const ArticleSchema = {
    name:ARTICLE_SCHEMA,
    primaryKey:'id_art',
    properties:{
        id_art:'int',
        design_art:'string',
        pu_art:'int', 
        qte_art:'int', 
        codebarre_art:'string',
        datelim_art:'date',
        num_lot_art:'int',
        typeArticle:{type:'list',objectType:TYPE_SCHEMA},
        casierArticle:{type:'list', objectType:CASIER_SCHEMA},
        categorieArticle:{type:'list',objectType:CATEGORIE_SCHEMA},
        monnaieArticle:{type:'list',objectType:MONNAIE_SCHEMA}
    }
};
//Fournir schéma
export const FournirSchema = {
    name:FOURNIR_SCHEMA,
    primaryKey:'id_fr',
    properties:{
        id_fr:'int',
        id_art:{type:'int',indexed:true},
        qte_fr:'int',
        date_fr:'date',
        num_lot_fr:'int',
    }
}
//Casier schéma
export const CasierSchema = {
    name: CASIER_SCHEMA,
    primaryKey:'id_cas',
    properties:{
        id_cas:'int',
        num_cas:'int'
    }
}
//Sortie schéma
export const SortieSchema = {
    name: SORTIE_SCHEMA,
    primaryKey:'ref_sortie',
    properties:{
        ref_sortie:'int',
        date_sortie:'date',
        motif_sortie:'string',
        qte_sortie:'int',
        article_sortie:{type:'list',objectType:ARTICLE_SCHEMA}
    }
}
//Monnaie schéma
export const MonnaieSchema = {
    name: MONNAIE_SCHEMA,
    primaryKey:'ref_monnaie',
    properties:{
        ref_monnaie:'int',
        type_monnaie:'string'
    }
}
//Catégorie schéma
export const CategorieSchema = {
    name:CATEGORIE_SCHEMA,
    primaryKey:'ref_cat',
    properties:{
        ref_cat:'int',
        libelle_cat:'string'
    }
}
//Type schéma
export const TypeSchema = {
    name:TYPE_SCHEMA,
    primaryKey:'ref_type',
    properties:{
        ref_type:'int',
        nom_type:'string'
    }
}

const databaseOptions = {
    path: 'Vraie_Database.realm',
    schema:[UserSchema,FrsSchema,ArticleSchema,CasierSchema,SortieSchema,MonnaieSchema,FournirSchema,CategorieSchema,TypeSchema],
    schemaVersion:3
};
//insertion utilisateur
export const insertNewUser = newUser => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=> {
            realm.create(USER_SCHEMA, newUser);
            resolve(newUser);
        });
    }).catch((error) => reject(error));
});

export function allUser(){
    Realm.open(databaseOptions).then(realm=>{
        let allU = realm.objects(USER_SCHEMA);
        let MyJSON = JSON.stringify(allU);
        console.log(MyJSON);
    });
};

//crud fournisseur
export const insertNewFrs = newFrs => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(FRS_SCHEMA, newFrs);
            resolve(newFrs);
        });
    }).catch((error) => reject(error));
});

export const updateFrs = frsList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingFrs = realm.objectForPrimaryKey(FRS_SCHEMA, frsList.id_frs);
            updatingFrs.nom_frs = frsList.nom_frs,
            updatingFrs.prenom_frs = frsList.prenom_frs,
            updatingFrs.tel_frs = frsList.tel_frs,
            updatingFrs.adresse_frs = frsList.adresse_frs;
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteFrs = frsId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingFrs = realm.objectForPrimaryKey(FRS_SCHEMA, frsId);
            realm.delete(deletingFrs);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllFrs = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allFrs = realm.objects(FRS_SCHEMA);
        resolve(allFrs);
    }).catch((error) => {
        reject(error);
    });
});

export const filterFrs =(searchText) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        let filteredFrs = realm.objects(FRS_SCHEMA).filtered(`nom_frs CONTAINS[c]"${searchText}" || prenom_frs CONTAINS[c]"${searchText}" || tel_frs CONTAINS[c]"${searchText}" || adresse_frs CONTAINS[c]"${searchText}"`);
        resolve(filteredFrs);
    }).catch((error)=>{
        reject(error)
    })
})

export const getFrsById = (id_frs)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.objects(FRS_SCHEMA).filtered(`id_frs==${id_frs}`);
            resolve(id_frs)
        });
    }).catch((error)=>{
        reject(error);
    })
}
//crud article
export const insertNewArticle = newArt => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(ARTICLE_SCHEMA, newArt);
            resolve(newArt);
        });
    }).catch((error) => reject(error));
});

export const updateArticle = articleList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingArt = realm.objectForPrimaryKey(ARTICLE_SCHEMA, articleList.id_art);
            updatingArt.design_art=articleList.design_art,
            updatingArt.codebarre_art=articleList.codebarre_art,
            updatingArt.pu_art=articleList.pu_art,
            updatingArt.qte_art=articleList.qte_art,
            //updatingArt.datelim_art=articleList.datelim_art,
            updatingArt.typeArticle=articleList.typeArticle,
            //updatingArt.casierArticle=articleList.casierArticle,
            updatingArt.categorieArticle=articleList.categorieArticle,
            updatingArt.monnaieArticle=articleList.monnaieArticle
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteArticle = artId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingArt = realm.objectForPrimaryKey(ARTICLE_SCHEMA, artId);
            realm.delete(deletingArt);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllArticle = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then( realm =>{
        let allArt = realm.objects(ARTICLE_SCHEMA);
        resolve(allArt);
    }).catch((error) => reject(error));
});
export function queryAllArt(){
    Realm.open(databaseOptions).then(realm=>{
        let allA = realm.objects(ARTICLE_SCHEMA);
        let MyJSON = JSON.stringify(allA);
        console.log(MyJSON);
    });
}
export const filterArticle =(searchArticle) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        let filteredArticle = realm.objects(ARTICLE_SCHEMA).filtered(`design_art CONTAINS[c]"${searchArticle}" || codebarre_art CONTAINS[c]"${searchArticle}"`);
        resolve(filteredArticle);
    }).catch((error)=>{
        reject(error)
    })
})
export const getArticleById = (id_art)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.objects(ARTICLE_SCHEMA).filtered(`id_art==${id_art}`);
            resolve(id_art)
        });
    }).catch((error)=>{
        reject(error);
    })
}
//crud fournir
export const insertFournir = newFr => new Promise((resolve,reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.create(FOURNIR_SCHEMA, newFr);
            resolve(newFr);
        });
    }).catch((error)=>reject(error));
});
export const updateFournir = FrList => new Promise((resolve,reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let updateFr = realm.objectForPrimaryKey(FOURNIR_SCHEMA,FrList.id_fr);
            updateFr.qte_fr=FrList.qte_fr,
            updateFr.article=FrList.article,
            updateFr.date_fr=FrList.date_fr
            resolve();
        });  
    }).catch((error)=>reject(error));
});
export const deleteFournir = FrId => new Promise((resolve,reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let deleteFr = realm.objectForPrimaryKey(FOURNIR_SCHEMA,FrId);
            realm.delete(deleteFr);
            resolve();
        });
    }).catch((error)=>reject(error));
})
export function queryAllFournir(){
    Realm.open(databaseOptions).then(realm=>{
        let allA = realm.objects(SORTIE_SCHEMA);
        let MyJSON = JSON.stringify(allA);
        console.log(MyJSON);
    });
} 
//crud categorie
export const insertNewCategorie = newCat => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(CATEGORIE_SCHEMA, newCat);
            resolve(newCat);
        });
    }).catch((error) => reject(error));
});

export const updateCategorie = categorieList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingCat = realm.objectForPrimaryKey(CATEGORIE_SCHEMA, categorieList.ref_cat);
            updatingCat.libelle_cat=categorieList.libelle_cat
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteCategorie = catId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingCat = realm.objectForPrimaryKey(CATEGORIE_SCHEMA, catId);
            realm.delete(deletingCat);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllCategorie = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then( realm =>{
        let allCat = realm.objects(CATEGORIE_SCHEMA);
        resolve(allCat);
    }).catch((error) => reject(error));
});

export function queryAllCat(){
    Realm.open(databaseOptions).then(realm=>{
        let allC = realm.objects(CATEGORIE_SCHEMA);
        // let lib = allC.cat_libelle
        // console.log(lib);
        let MyJSON = JSON.stringify(allC);
        console.log(MyJSON);
    });
}
export const filterCategorie =(searchCat) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        let filteredCat = realm.objects(CATEGORIE_SCHEMA).filtered(`libelle_cat CONTAINS[c]"${searchCat}"`);
        resolve(filteredCat);
    }).catch((error)=>{
        reject(error)
    })
})
export const getCategorieById = (ref_cat)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.objects(CATEGORIE_SCHEMA).filtered(`ref_cat==${ref_cat}`);
            resolve(ref_cat)
        });
    }).catch((error)=>{
        reject(error);
    })
}

//crud type
export const insertNewType = newType => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(TYPE_SCHEMA, newType);
            resolve(newType);
        });
    }).catch((error) => reject(error));
});

export const updateType = typeList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingType = realm.objectForPrimaryKey(TYPE_SCHEMA, typeList.ref_type);
            updatingType.nom_type=typeList.nom_type
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteType = typeId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingType = realm.objectForPrimaryKey(TYPE_SCHEMA, typeId);
            realm.delete(deletingType);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllType = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then( realm =>{
        let allType = realm.objects(TYPE_SCHEMA);
        resolve(allType);
    }).catch((error) => reject(error));
});

export function queryType(){
    Realm.open(databaseOptions).then(realm=>{
        let allT = realm.objects(TYPE_SCHEMA);
        // let lib = allC.cat_libelle
        // console.log(lib);
        let MyJSON = JSON.stringify(allT);
        console.log(MyJSON);
    });
}
export const filterType =(searchType) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        let filteredType = realm.objects(TYPE_SCHEMA).filtered(`nom_type CONTAINS[c]"${searchType}"`);
        resolve(filteredType);
    }).catch((error)=>{
        reject(error)
    })
})
export const getTypeById = (ref_type)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.objects(TYPE_SCHEMA).filtered(`ref_type==${ref_type}`);
            resolve(ref_type)
        });
    }).catch((error)=>{
        reject(error);
    })
}
//casier
export const getCasierById = (id_cas) =>new Promise((resolve,reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.objects(CASIER_SCHEMA).filtered(`id_cas==${id_cas}`);
            resolve(id_cas)
        });
    }).catch((error)=>{
        reject(error);
    })
})

export const insertCasier = newCas => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(CASIER_SCHEMA, newCas);
            resolve(newCas);
        });
    }).catch((error) => reject(error));
})

export const updateCasier = casierList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingCas = realm.objectForPrimaryKey(CASIER_SCHEMA, casierList.id_cas);
            updatingCas.num_cas=casierList.num_cas
            resolve();
        });
    }).catch((error) => reject(error));
});

export function queryAllCasier(){
    Realm.open(databaseOptions).then(realm=>{
        let allC = realm.objects(CASIER_SCHEMA);
        // let lib = allC.cat_libelle
        // console.log(lib);
        let MyJSON = JSON.stringify(allC);
        console.log(MyJSON);
    });
}

export const deleteCasier = id_cas => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingCas = realm.objectForPrimaryKey(CASIER_SCHEMA, id_cas);
            realm.delete(deletingCas);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllCase = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then( realm =>{
        let allCase = realm.objects(CASIER_SCHEMA);
        resolve(allCase);
    }).catch((error) => reject(error));
});

//crud sortie
export const insertSortie = newSortie => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.create(SORTIE_SCHEMA,newSortie);
            resolve(newSortie)
        }).catch((error)=>{
            reject(error);
        });
    });
});

export const updateSortie = sortieList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingSort = realm.objectForPrimaryKey(SORTIE_SCHEMA, sortieList.ref_sortie);
            updatingSort.date_sortie=sortieList.date_sortie,
            updatingSort.motif_sortie=sortieList.motif_sortie,
            updatingSort.qtedate_sortie=sortieList.qte_sortie,
            updatingSort.article_sortie=sortieList.article_sortie,
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteSortie = ref_sortie => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingSort = realm.objectForPrimaryKey(SORTIE_SCHEMA, ref_sortie);
            realm.delete(deletingSort);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllSortie = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then( realm =>{
        let allSort = realm.objects(SORTIE_SCHEMA);
        resolve(allSort);
    }).catch((error) => reject(error));
});

//crud monnaie
export const insertMonnaie = newMon => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(()=>{
            realm.create(MONNAIE_SCHEMA, newMon);
            resolve(newMon);
        });
    }).catch((error) => reject(error));
});
export const updateMonnaie = monnaieList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingMon = realm.objectForPrimaryKey(MONNAIE_SCHEMA, monnaieList.ref_monnaie);
            updatingMon.type_monnaie=monnaieList.type_monnaie,
            resolve();
        });
    }).catch((error) => reject(error));
});
export const deleteMonnaie = ref_monnaie => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingMon = realm.objectForPrimaryKey(MONNAIE_SCHEMA, ref_monnaie);
            realm.delete(deletingMon);
            resolve();
        });
    }).catch((error) => reject(error));
});
export const queryAllMonnaie = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then( realm =>{
        let allMon = realm.objects(MONNAIE_SCHEMA);
        resolve(allMon);
    }).catch((error) => reject(error));
});
export function queryAllMon(){
    Realm.open(databaseOptions).then(realm=>{
        let allC = realm.objects(MONNAIE_SCHEMA);
        // let lib = allC.cat_libelle
        // console.log(lib);
        let MyJSON = JSON.stringify(allC);
        console.log(MyJSON);
    });
}
export const filterMonnaie =(searchMonnaie) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        let filteredMonnaie = realm.objects(MONNAIE_SCHEMA).filtered(`type_monnaie CONTAINS[c]"${searchMonnaie}"`);
        resolve(filteredMonnaie);
    }).catch((error)=>{
        reject(error)
    })
})
export const getMonnaieById = (ref_monnaie) =>new Promise((resolve,reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.objects(MONNAIE_SCHEMA).filtered(`ref_monnaie==${ref_monnaie}`);
            resolve(ref_monnaie)
        });
    }).catch((error)=>{
        reject(error);
    })
})
export default new Realm(databaseOptions);

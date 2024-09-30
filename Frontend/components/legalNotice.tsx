import React from 'react';

export const LegalNotice = () => {
    return (
        <div className="flex flex-col items-center text-gray-900 py-12 px-6 sm:px-16 lg:px-32">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Mentions légales</h1>
                
                <p className="text-lg leading-relaxed mb-4">
                    Ce site est édité et hébergé par <strong>Jobbi</strong>, SAS, au capital de 10 euros,
                    immatriculée au Registre du commerce et des sociétés de Lyon, sous le numéro
                    000 000 000, dont le siège social est situé au 26 Av. Tony Garnier 3ème étage,
                    69007 Lyon, France.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    <strong>Tél. :</strong> 06 52 69 74 14
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Le Directeur de publication est Yann BONAUDO.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Toute personne qui accède au site de Jobbi s’engage à respecter les présentes
                    conditions d’utilisation.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Jobbi décline toute responsabilité quant au contenu, à l’exactitude, à la fiabilité,
                    à la précision, à la pertinence et à l’exhaustivité des informations et données
                    diffusées sur le présent site, sous quelque forme que ce soit (liens hypertexte,
                    encarts de cotation, fichiers, publicité, etc…). Notamment, Jobbi ne pourra voir
                    sa responsabilité engagée du fait d’erreurs ou de retards dans la transmission
                    desdites informations et données.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Toutes les informations et données diffusées sur le présent site ne sont fournies
                    qu’à titre indicatif et ne dispensent pas leur utilisateur de procéder à la
                    vérification de leur exactitude et de les utiliser avec discernement et esprit
                    critique. Notamment, Jobbi ne pourra être tenu pour responsable des décisions,
                    quelles que soient leur nature, prises par l’utilisateur sur consultation de ce
                    site et des informations et données qui y sont diffusées.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Les offres et devis proposés par Jobbi sur son site ne sauraient avoir de caractère
                    contractuel et ne sauraient lier Jobbi de quelque manière que ce soit. Il appartient
                    à l’utilisateur de ce site de se mettre en contact directement avec un conseiller Jobbi.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Jobbi décline toute responsabilité quant aux difficultés techniques que pourrait,
                    le cas échéant, rencontrer l’utilisateur de ce site, quelle qu’en soit la cause,
                    notamment la survenance de bogues, le défaut de capacité du terminal utilisé par
                    l’utilisateur à restituer l’information, le non-respect de l’intégrité de
                    l’information à travers le réseau de communication ainsi que l’ensemble des
                    risques liés à la sécurité du réseau et en particulier les risques de détournement
                    de l’information.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Jobbi se réserve le droit d’apporter toutes modifications et améliorations qu’il
                    jugera nécessaires ou utiles dans le cadre du bon fonctionnement de ses services.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">En ce qui concerne vos données personnelles :</h2>
                
                <p className="text-lg leading-relaxed mb-4">
                    Les informations recueillies sur ce site peuvent faire l’objet d’un traitement
                    informatique destiné à traiter votre demande.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Les données à caractère personnel collectées par Jobbi sont conservées pour la durée
                    nécessaire à la réalisation des finalités précisées ci-dessus, augmentée des délais
                    légaux ou de prescription en vigueur.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Les données à caractère personnel collectées sont traitées et hébergées en France
                    et en Union Européenne.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Les données à caractère personnel traitées sont destinées aux services internes de
                    Jobbi, à ses partenaires, ses sous-traitants, aux établissements bancaires, aux
                    établissement postaux, ainsi qu’aux éventuels distributeurs des services proposés
                    par Jobbi.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et
                    au Règlement européen sur la protection des données (RGPD), vous bénéficiez d’un
                    droit d’accès, de rectification, d’opposition et d’effacement des informations ainsi
                    que d’un droit à la limitation du traitement vous concernant, que vous pouvez
                    exercer en écrivant à « Jobbi, Délégué à la Protection des Données, 26 rue du
                    Faubourg Poissonnière, 75010 Lyon » ou à l’adresse <a href="mailto:privacy@Jobbi.fr" className="text-blue-600 hover:underline">privacy@Jobbi.fr</a>,
                    sans oublier de joindre un justificatif d’identité.
                </p>
                
                <p className="text-lg leading-relaxed mb-4">
                    Les personnes concernées disposent de la faculté d’introduire une réclamation auprès
                    de l’autorité de contrôle (CNIL). Elles pourront en outre s’adresser directement au
                    Délégué à la Protection des Données de Jobbi sur <a href="mailto:privacy@Jobbi.fr" className="text-blue-600 hover:underline">privacy@Jobbi.fr</a>.
                </p>
            </div>
        </div>
    );
};

export default LegalNotice;

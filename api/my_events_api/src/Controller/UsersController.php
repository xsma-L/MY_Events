<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Users;


class UsersController extends AbstractController
{
    /**
     * @Route("/verify", name="users-verify")
     * @param Request $request the request object
     */
    public function verify(Request $request)
    {
        $array = [];
        $array = json_decode($request->getContent(), true);
        $id = $array['id_facebook'];
        $em = $this->get('doctrine')->getManager();
        $query = $em->createQuery("SELECT u FROM \App\Entity\Users u WHERE u.id_facebook = :id");
        $query->setParameter('id', $id);
        $user = $query->getOneOrNullResult();
        if($user == null){
            $data = 'no_registed';
        }else{
            $data = 'registed';
        }

        $response = new Response();
        $response = new JsonResponse(['message' => $data]);
            $response->setStatusCode(Response::HTTP_OK);
            $response->send();
    }

    /**
     * @Route("/users", name="users")
     * @param Request $request the request object
     */
    public function register(Request $request)
    {
        $user = new Users;
        $response = new Response();
        $entityManager = $this->getDoctrine()->getManager();
        
        // $ok = $request->query->get('avatar');

        $array = [];
        $array = json_decode($request->getContent(), true);
        // $id_facebook = intval($request->request->get('facebook'));
        // $avatar = $request->request->get('avatar');
        // $bio = $request->request->get('bio');
        // $pseudo = $request->request->get('pseudo');
        // $email = $request->request->get('email');

        $user->setPseudo($array['pseudo']);
        $user->setIdFacebook($array[['id_facebook']]);
        $user->setEmail($array['email']);
        $user->setAvatar($array['avatar']);
        $user->setBio($array['bio']);
        $entityManager->persist($user);
        $entityManager->flush();
        // exit;   
        
        $response = new JsonResponse(['facebook' => '$id_facebook', 'avatar' => '$avatar', 'bio' => '$bio', 'pseudo' => '$pseudo', 'email' => '$email']);
        $response->setStatusCode(Response::HTTP_OK);
        $response->send();
    }
}

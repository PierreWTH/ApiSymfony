<?php

namespace App\Controller;

use App\HttpClient\BGAHttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/game', name: 'app_game', methods: ['POST'])]
    public function displayGame(BGAHttpClient $bga, Request $request)
    {
        $search = $request->request->get('gameId');
        return new Response($bga->getGame($search));
    }
}

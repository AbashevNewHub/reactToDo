<?php

namespace App\Service;

use Symfony\Component\Form\Form;

class TodoFormValidHelper
{
    /**
     * @param Form $form
     * @return bool|array
     */
    public function isValidData(Form $form)
    {
        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $errors;
        }
        return true;
    }
}
